const db = require("../../Models/index");
const {PlintronClient} = require("./Utils/plintronClient");
const {PlintronError, errCheckerPlintron} = require("../../Exceptions/plintronError");
const {paymentServices} = require("../../Services/hub.services");
const {plintronLogger} = require("../../Utils/logger");
const PlintronPlan = db.PlintronPlan;
const UserSimPlan = db.UserSimPlan;
const PlintronSim = db.PlintronSim;
const Plan = db.Plan;
const UserPay = db.UserPay;
const Delivery = db.Delivery;
const User = db.User;
const WholesalePlan = db.WholesalePlan;
const UserSimStatistic = db.UserSimStatistic;
const UserPlanHistory = db.UserPlanHistory;
const UserSimPort = db.UserSimPort;
const Sequelize = require('sequelize');
const moment = require("moment");
const {getPagination, getPagingData} = require("../../Utils/dbHelpers");
const {formatUnit} = require("../../Utils/memoryConvertor");
const Op = Sequelize.Op;
const {MessageCodeDesc} = require('../../Utils/messageCodeDescs');

class PlanClass {

    async querySubscriberUsage(icc_id) {
        try {
            const result = await PlintronClient.req({icc_id}, 'QUERY_SUBSCRIBER_USAGE_V2');
            return result?.query_subscriber_usage_v2_response;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async getSubscriberBundleInfo(icc_id) {
        try {
            const result = await PlintronClient.req({icc_id}, 'GET_SUBSCRIBER_BUNDLE_INFO');
            return result?.get_subscriber_bundle_info_response;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async getBundleFreeUsageInfo(data) {
        try {
            const result = await PlintronClient.req({
                icc_id: data.icc_id,
                bundle_code: data.bundle_code
            }, 'GET_BUNDLE_FREE_USAGE_INFO');
            return result?.get_bundle_free_usage_info_response;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async changePlanPlintron(data) {
        try {
            await PlintronClient.req({
                icc_id: data.icc_id,
                package: data.package
            }, 'CHANGE_PLAN');
            return true;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async updateWps(data) {
        try {
            await PlintronClient.req({
                icc_id: data.icc_id,
                wps: data.wps
            }, 'UPDATE_WPS');
            return true;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async getHistory(data) {
        try {
            const {limit, offset, page} = getPagination(data.page, data.per_page);
            let options = {
                limit, offset,
                order: [['createdAt', 'DESC']],
                attributes: {exclude: ['userSimPlanId', 'updatedAt']},
                where: {userSimPlanId: data.productId}
            };
            if (data.type) options.where.type = data.type;
            return getPagingData(await UserPlanHistory.findAndCountAll(options), page, limit);
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code, e.message);
        }
    };


    // Local service
    async getProductDetails(productId) {
        try {
            let simInfo;
            let userSimPlan = await UserSimPlan.findOne({
                where: {id: productId},
                include: [
                    {model: PlintronSim},
                    {
                        model: PlintronPlan,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: Delivery,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {model: Plan, as: 'plan'},
                    {
                        model: User,
                        attributes: {exclude: ['createdAt', 'updatedAt', 'password']}
                    },
                    {
                        model: UserSimStatistic,
                        order: [['createdAt', 'DESC']]
                    },
                    {model: UserSimPort}
                ]
            });
            errCheckerPlintron(!userSimPlan, 'User sim plan not found');
            let plan = userSimPlan?.plan?.dataValues;

            simInfo = {
                productId: userSimPlan?.id,
                status: userSimPlan?.status,
                msisdn: userSimPlan?.PlintronSim?.MSISDN,
                isPortIn: !!userSimPlan?.PlintronSim?.PMSISDN,
                simType: userSimPlan?.PlintronSim?.type,
                user: userSimPlan?.User
            };

            if ((userSimPlan.Delivery && (userSimPlan.Delivery?.status !== ('delivered' || 'shipped')))
                || (userSimPlan.PlintronSim?.status !== "BUSY" && userSimPlan.PlintronSim?.MSISDN?.length !== 10)) {
                simInfo.delivery = userSimPlan.Delivery;
                simInfo.plan = plan;
                simInfo.userSimPort = {
                    ...userSimPlan.UserSimPort,
                    messageCodeDescription: MessageCodeDesc[userSimPlan.UserSimPort?.messageCode || ''] || ''
                },
                simInfo.plan.internetCount = formatUnit(plan.internetCount);
                return simInfo;
            }

            if (userSimPlan.newPlanId) {
                const changePlanPay = await UserPay.findOne({
                    where: {
                        productId: {[Op.contains]: [userSimPlan?.id]},
                        action: {[Op.or]: ["changePlan", "changePlanCompany"]},
                        status: {[Op.not]: "paid"}
                    },
                    order: [['createdAt', 'ASC']]
                })
                simInfo = {
                    ...simInfo,
                    changePlanPayId: changePlanPay.id || null
                };
            }

            try {
                const bundleFreeUsageInfo = await this.getBundleFreeUsageInfo({
                    icc_id: userSimPlan.PlintronSim.ICCID,
                    bundle_code: userSimPlan.PlintronPlan.planID
                });

                if (!userSimPlan.expireDate) {
                    let bundleExpiry;
                    const bundle_expiry = bundleFreeUsageInfo?.bundle_expiry;
                    bundleExpiry = moment(`${bundle_expiry} 23:59:59`, "DD-MM-YYYY hh:mm:ss").toDate()
                    await UserSimPlan.update({expireDate: bundleExpiry}, {where: {id: userSimPlan.id}});
                    userSimPlan.expireDate = bundleExpiry;
                }
            } catch (e) {
                plintronLogger.error(e);
            }

            let userSimStatistic = (userSimPlan.UserSimStatistics[0]) ?
                userSimPlan.UserSimStatistics[0] : {min: 0, sms: 0, internet: 0};
            let remainderInternet = formatUnit(userSimPlan.plan.internetCount - userSimStatistic.internet);
            userSimPlan.plan.internetCount = formatUnit(userSimPlan.plan.internetCount);
            simInfo = {
                ...simInfo,
                plan: {
                    ...plan,
                    used: {
                        min: userSimStatistic.min,
                        sms: userSimStatistic.sms,
                        internet: formatUnit(userSimStatistic.internet),
                    },
                    remainder: {
                        min: (userSimPlan.plan.minuteCount - userSimStatistic.min) || userSimPlan.plan.minuteCount,
                        sms: (userSimPlan.plan.SMSCount - userSimStatistic.sms) || userSimPlan.plan.SMSCount,
                        internet: remainderInternet
                    }
                },
                userSimPort: {
                    ...userSimPlan.UserSimPort,
                    messageCodeDescription: MessageCodeDesc[userSimPlan.messageCode] || ''
                },
                querySubscriber: (await this.querySubscriberUsage(userSimPlan.PlintronSim.ICCID))
            };
            return simInfo;
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code, e.message);
        }
    };

    async changePlan(productId, newPlanId) {
        try {
            const userSimPlan = await UserSimPlan.findOne({
                where: {id: productId},
                include: [{model: Plan, as: 'plan'}]
            });
            errCheckerPlintron(!userSimPlan, 'User sim plan not found');
            errCheckerPlintron(userSimPlan.newPlanId, 'The request to change the tariff plan has already been sent');
            const newPlan = await Plan.findByPk(newPlanId);
            errCheckerPlintron(!newPlan, 'New plan not found');
            errCheckerPlintron(userSimPlan.plan.id === newPlan.id, 'The tariff plans are the same');

            let sum = 0;
            if (Number(userSimPlan.plan.costPerMonth) < Number(newPlan.costPerMonth))
                sum = Number(newPlan.costPerMonth) - Number(userSimPlan.plan.costPerMonth)

            await UserSimPlan.update({newPlanId: newPlan.id}, {where: {id: userSimPlan.id}});
            return {sum, productId: userSimPlan.id};
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code, e.message);
        }
    };

    async confirmingPlanChange(data) {
        try {

            let dbReq = {
                where: {
                    action: {[Op.or]: ["changePlan", "changePlanCompany"]}
                }
            };

            (data.productId) ?
                dbReq.where.productId = {[Op.contains]: [data.productId]} :
                dbReq.where.id = data.payId;

            const userPay = await UserPay.findOne(dbReq);
            errCheckerPlintron(!userPay, 'User pay not found');
            if (userPay?.status !== 'paid') {
                const paymentStatus = await paymentServices.changePaymentStatus(userPay);
                errCheckerPlintron(!paymentStatus, 'Payment not confirmed');
                await UserPay.update({status: 'paid'}, {where: {id: userPay.id}});
            }

            for (const productId of userPay.productId) {
                try {
                    let userSimPlan = await UserSimPlan.findOne({
                        where: {id: productId},
                        include: [
                            {model: PlintronSim},
                            {model: Plan, as: 'plan'},
                            {model: Plan, as: 'newPlan'},
                        ]
                    });
                    errCheckerPlintron(!userSimPlan?.newPlanId, 'No change plans found');
                    const optimizePlan = await this.searchPlan({planId: userSimPlan.newPlanId});
                    const result = await PlintronClient.req({
                        icc_id: userSimPlan.PlintronSim.ICCID,
                        bundle_code: optimizePlan.plintronPlan.planID
                    }, 'SUBSCRIBE_BUNDLE');

                    plintronLogger.error(result?.subscribe_bundle_response);
                    if (result?.subscribe_bundle_response) {
                        await Plan.update({rating: ((userSimPlan.plan.rating > 0) ? userSimPlan.plan.rating - 1 : 0)}, {where: {id: userSimPlan.plan.id}});
                        await Plan.update({rating: (userSimPlan.newPlan.rating + 1)}, {where: {id: userSimPlan.newPlan.id}});
                        const wholesalePlan = await WholesalePlan.findOne({
                            where: {unitCap: {[Op.gt]: 0}},
                            order: [['unitCap', 'ASC']]
                        });
                        await UserSimPlan.update({
                            plintronPlanId: optimizePlan.plintronPlan.id,
                            planId: optimizePlan.plan.id,
                            newPlanId: null,
                            wholesalePlanId: wholesalePlan.id
                        }, {where: {id: userSimPlan.id}});
                    } else
                        throw new Error("Plan update error");
                } catch (e) {
                    plintronLogger.error(`Pay ID - ${data.payId}  Product ID - ${data.productId}  message: ${e.message}`);
                    throw new PlintronError(e.code, e.message);
                }
            }
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code, e.message);
        }
    }

    async searchPlan(data) {
        const plan = await Plan.findByPk(data.planId);
        errCheckerPlintron(!plan, 'Plan not found');
        const plintronPlan = await PlintronPlan.findOne({
            where: {
                [Op.and]: [
                    {minuteCount: {[Op.gte]: plan.minuteCount}},
                    {SMSCount: {[Op.gte]: plan.SMSCount}},
                    {internetCount: {[Op.gte]: plan.internetCount}}
                ]
            },
            order: [['costPerMonth', 'ASC']]
        });
        errCheckerPlintron(!plintronPlan, 'Plintron plan not found');
        return {plintronPlan, plan};
    }
}


module.exports = {
    planClass: new PlanClass()
};
