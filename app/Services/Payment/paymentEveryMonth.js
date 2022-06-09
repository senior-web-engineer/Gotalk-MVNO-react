const db = require("../../Models/index");
const {payLogger} = require("../../Utils/logger");
const {mailerServices} = require("../mailer.services");
const UserSimPlan = db.UserSimPlan;
const PlintronSim = db.PlintronSim;
const Plan = db.Plan;
const User = db.User;
const Company = db.Company;
const WholesalePlan = db.WholesalePlan;
const UserSimStatistic = db.UserSimStatistic;
const UserPay = db.UserPay;
const CouponUsage = db.CouponUsage;
const UserProduct = db.UserProduct;
const Sequelize = require('sequelize');
const {planClass} = require("../Plintron/plan");
const {simCardClass} = require("../Plintron/simCard");
const Op = Sequelize.Op;
const {paymentServices} = require("../../Services/hub.services");


exports.paymentEveryMonth = async () => {
    try {
        payLogger.cron("------ Payment every month started ------")
        let messageArr = {
            info: [],
            errors: []
        };

        const dBQueryDate = new Date();
        let dBQueryInclude = {
            include: [
                {model: PlintronSim},
                {model: Plan, as: 'plan'},
                {
                    model: User,
                    include: [{model: Company}]
                }
            ]
        };

        const userSimPlans = [
            ...await UserSimPlan.findAll({
                where: {
                    status: "active",
                    expireDate: {
                        [Op.and]: {
                            [Op.gte]: `${dBQueryDate.getFullYear()}-${dBQueryDate.getMonth() + 1}-${dBQueryDate.getDate()} 00:00:00 EST`,
                            [Op.lte]: `${dBQueryDate.getFullYear()}-${dBQueryDate.getMonth() + 1}-${dBQueryDate.getDate()} 23:59:59 EST`
                        }
                    }
                },
                ...dBQueryInclude
            }),
            ...await UserSimPlan.findAll({
                where: {status: "not_paid"},
                ...dBQueryInclude
            }),
        ];

        payLogger.cron(userSimPlans)

        for (const userSimPlan of userSimPlans) {
            try {
                let date = new Date();
                let balance = Number(userSimPlan.User.balance);
                let planPrice = Number(userSimPlan.plan.costPerMonth);
                let payerId = userSimPlan.User.id;
                let userEmail = userSimPlan.User.email;

                const couponUsage = await CouponUsage.findOne({
                    where: {
                        userSimPlanIds: {[Op.contains]: [userSimPlan.id]}
                    }
                });
                let discountAmount = 0;
                if(couponUsage && couponUsage.usedMonthCount < couponUsage.monthCount) {
                    discountAmount = couponUsage.discountAmount / couponUsage.userSimPlanIds.length;
                    planPrice -= discountAmount;
                }

                if (userSimPlan.User.companyId) {
                    let owner = await User.findByPk(userSimPlan.User.Company.ownerId)
                    balance = owner.balance;
                    payerId = owner.id;
                    userEmail = owner.email;
                }

                let newBalance = balance - planPrice;
                let isPaid = false;
                let payType = "";

                if(newBalance < 0 && userSimPlan.User.stripeCustomerId) {
                    const userProduct = await UserProduct.findOne({
                        where: {productId: userSimPlan.id}
                    });
                    const userPay = await UserPay.create({
                        action: "sim_plan_monthly",
                        sum: planPrice,
                        userId: userSimPlan.User.id,
                        productId: [userProduct.id],
                        paymentType: 'stripe',
                        discountAmount: discountAmount,
                        couponId: couponUsage?.couponId,
                        doCaptureLater: false
                    });
                    isPaid = await paymentServices.makeRecurrencePayment({
                        ...userPay,
                        stripeCustomerId: userSimPlan.User.stripeCustomerId
                    });

                    payType = "card";
                } else {
                    isPaid = true;
                    payType = "balance";
                }

                if (isPaid) {

                    if(couponUsage) {
                        await CouponUsage.update({
                            usedMonthCount: couponUsage.usedMonthCount + 1
                        }, {
                            where: couponUsage.id
                        });
                    }

                    let paidOnTime = true;
                    // Update wholesale plan
                    const wholesalePlan = await WholesalePlan.findOne({
                        where: {unitCap: {[Op.gt]: 0}},
                        order: [['unitCap', 'ASC']]
                    });
                    const req = {
                        icc_id: userSimPlan.PlintronSim.ICCID,
                        wps: wholesalePlan.WPS
                    };
                    await planClass.updateWps(req);
                    //
                    let dbReq = {
                        expireDate: date.setMonth(date.getMonth() + 1),
                        wholesalePlanId: wholesalePlan?.id || 2
                    };
                    if (userSimPlan.status === "not_paid") {
                        await simCardClass.modifySubscriberStatus({
                            icc_id: userSimPlan.PlintronSim.ICCID,
                            status: "A"
                        });
                        dbReq.status = "active";
                        paidOnTime = false;
                    }

                    if(payType === 'balance') {
                        await User.update({balance: newBalance}, {where: {id: payerId}});
                    }

                    await UserSimPlan.update(dbReq, {where: {id: userSimPlan.id}});
                    await UserSimStatistic.create({sms: 0, min: 0, internet: 0, userSimPlanId: userSimPlan.id});
                    messageArr.info.push({userSimPlan: userSimPlan.id, balance: newBalance, payerId, paidOnTime});
                    continue;
                }

                userSimPlan.expireDate.setDate(userSimPlan.expireDate.getDate() + 3)
                if (userSimPlan.status === "active") {
                    await simCardClass.modifySubscriberStatus({
                        icc_id: userSimPlan.PlintronSim.ICCID,
                        status: "B"
                    });
                    await UserSimPlan.update({status: "not_paid"}, {where: {id: userSimPlan.id}});
                    messageArr.errors.push({
                        userSimPlan: userSimPlan.id,
                        balance: newBalance,
                        payerId,
                        userEmail,
                        message: "Insufficient funds to pay"
                    });
                    await mailerServices.sender(userEmail, `Insufficient funds to write off money according to the tariff plan`, "Pay notify", "pay/insufficientFundsPay");
                } else if (userSimPlan.status === "not_paid" && date.getDate() >= userSimPlan.expireDate.getDate()) {
                    await UserSimPlan.update({status: "blocked_paid"}, {where: {id: userSimPlan.id}});
                    messageArr.errors.push({
                        userSimPlan: userSimPlan.id,
                        balance: newBalance,
                        payerId,
                        message: "Payment waiting limit exceeded user blocked"
                    });
                } else throw new Error('Other error');
            } catch (e) {
                messageArr.errors.push({userSimPlan: userSimPlan.id, message: e.message});
            }
        }
        payLogger.cron(messageArr)
    } catch (e) {
        payLogger.cronErr("------ Payment every month fatal error ------")
        payLogger.cronErr(e.message)
    }
}
