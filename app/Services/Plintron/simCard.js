const {PlintronClient} = require('./Utils/plintronClient');
const parserSim = require('./Utils/simCardParse');
const {planClass} = require("../../Services/Plintron/plan");
const {PlintronError, errCheckerPlintron} = require("../../Exceptions/plintronError");
const db = require("../../Models/index");
const {mailerServices} = require("../../Services/mailer.services");
const {deliveryServices, paymentServices} = require("../../Services/hub.services");
const {plintronLogger} = require("../../Utils/logger");
const {httpClient} = require("../../Utils/httpClient");
const PlintronSim = db.PlintronSim;
const UserProduct = db.UserProduct;
const UserPay = db.UserPay;
const User = db.User;
const Plan = db.Plan;
const WholesalePlan = db.WholesalePlan;
const UserSimPlan = db.UserSimPlan;
const PlintronPlan = db.PlintronPlan;
const UserSimStatistic = db.UserSimStatistic;
const Company = db.Company;
const StripPay = db.StripPay;
const Delivery = db.Delivery;
const Sequelize = require('sequelize');
const {plintron} = require("../../../config/index.config");
const Op = Sequelize.Op;

class SimCardClass {

    async activateSimAndSetPlan(data) {
        try {
            if (!data?.plan_id) {
                const optimizePlan = await planClass.searchPlan(data);
                data.plan_id = optimizePlan.plintronPlan.planID;
            }

            const res = await PlintronClient.req({
                icc_id: data.icc_id,
                zip_code: data.zip_code,
                bundle_code: data.plan_id,
            }, 'ACTIVATE_SIM_WITH_BUNDLE');

            return res?.activate_sim_with_bundle_response || null;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async extMnpCreatePortin(data) {
        try {
            await PlintronClient.req({
                icc_id: data.icc_id,
                pmsisdn: data.pmsisdn,
                osp_account_number: data.osp_account_number,
                osp_account_password: data.osp_account_password,
                name: data.name,
                address_line: data.address_line,
                city: data.city,
                state: data.state,
                zip: data.zip,
                zip_code: data.zip_code
            }, 'EXT_MNP_CREATE_PORTIN');
            return true;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    // test
    async queryDevice(data) {
        try {
            return await PlintronClient.req({imei: data.imei}, 'QUERY_DEVICE');
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async manageCallForwarding(data) {
        try {
            return await PlintronClient.req({
                icc_id: data.icc_id,
                forwarded_msisdn: data.forwarded_msisdn,
                operation_code: data.operation_code
            }, 'MANAGE_CALL_FORWARDING');
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async extMnpQueryPortin(data) {
        try {
            return await PlintronClient.req({pmsisdn: data.pmsisdn}, 'EXT_MNP_QUERY_PORTIN');
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async extMnpUpdatePortin(data) {
        try {
            return await PlintronClient.req({
                icc_id: data.icc_id,
                pmsisdn: data.pmsisdn,
                osp_account_number: data.osp_account_number,
                osp_account_password: data.osp_account_password,
                name: data.name,
                address_line: data.address_line,
                city: data.city,
                state: data.state,
                zip: data.zip,
                zip_code: data.zip_code
            }, 'EXT_MNP_UPDATE_PORTIN');
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async extMnpCancelPortin(data) {
        try {
            return await PlintronClient.req({
                icc_id: data.icc_id,
                pmsisdn: data.pmsisdn,
                cancelation_type: data.cancelation_type,
            }, 'EXT_MNP_CANCEL_PORTIN');
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async portoutDeactivation(msisdn) {
        try {
            return await PlintronClient.req({msisdn: msisdn}, 'PORTOUT_DEACTIVATION');
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async portoutValidation(data) {
        try {
            return await PlintronClient.req({
                msisdn: data.msisdn,
                osp_account_number: data.osp_account_number,
                osp_account_password: data.osp_account_password,
                name: data.name,
                address_line: data.address_line,
                city: data.city,
                state: data.state,
                zip: data.zip,
                last_name: data.last_name
            }, 'PORTOUT_VALIDATION');
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }


    // test


    async extMnpCheckPortinEligibility(data) {
        try {
            await PlintronClient.req({pmsisdn: data.pmsisdn}, 'EXT_MNP_CHECK_PORTIN_ELIGIBILITY');
            return true;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async getAccountDetails(icc_id) {
        try {
            const result = await PlintronClient.req({icc_id: icc_id}, 'GET_ACCOUNT_DETAILS');
            return result.get_account_details_response || null;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async deactivateSubscriber(icc_id) {
        try {
            await PlintronClient.req({icc_id: icc_id}, 'PA_DEACTIVATE_SUBSCRIBER');
            return true;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async modifySubscriberStatus(data) {
        try {
            await PlintronClient.req({
                icc_id: data.icc_id,
                status: data.status
            }, 'MODIFY_SUBSCRIBER_STATUS');
            return true;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async changeSimPlintron(data) {
        try {
            const result = await PlintronClient.req({msisdn: data.msisdn, new_iccid: data.new_iccid}, 'CHANGE_SIM');
            return result.change_sim_response || null;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    // Local service
    async importSim() {
        try {
            return await parserSim.import();
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async getPlintronSim(user, body) {
        try {
            const userId = (user.role === 'Owner') ? body.userId : user.id;

            const plintronSim = await PlintronSim.findOne({
                where: {
                    userId,
                    status: 'BUSY',
                    id: body.plintronId
                }
            });
            if (!plintronSim) throw new Error('Plintron sim not attach');
            return plintronSim;
        } catch (e) {
            throw new PlintronError(e.code, e.message);
        }
    }

    async buySim(data, userId) {
        try {
            let productIds = [], sum = 0, info = [];
            let deliveryId = (data?.delivery) ? await deliveryServices.create(data.delivery) : null;
            for (const product of data.products) {
                for (let i = 1; i <= Number(product.count); i++) {
                    try {
                        const item = await this.simBooking(product, userId, deliveryId);
                        productIds.push(item.productId);
                        sum += item.sum;
                        info.push({
                            product: {userId, planId: product.planId},
                            productId: item.productId,
                            sum: item.sum,
                            isError: false
                        })
                    } catch (e) {
                        info.push({
                            product: {userId, planId: product.planId},
                            message: e.message,
                            isError: true
                        });
                    }
                }
            }
            return {sum, productIds, info}
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code || 0, e.message || "Error");
        }
    };

    async simBooking(data, userId, deliveryId) {

        let product, simPlan, sum = 0, delivery;

        try {
            const optimizePlan = await planClass.searchPlan(data);
            const wholesalePlan = await WholesalePlan.findOne({
                where: {unitCap: {[Op.gt]: 0}},
                order: [['unitCap', 'ASC']]
            });
            errCheckerPlintron(!wholesalePlan, 'Wholesale plan not found');

            let simPlanReq = {
                userId,
                plintronPlanId: optimizePlan.plintronPlan.id,
                planId: optimizePlan.plan.id,
                deliveryId: deliveryId,
                wholesalePlanId: wholesalePlan.id,
                simType: data.isEsim ? "esim" : "physical"
            };

            if (data.isEsim) {
                let plintronSim = await PlintronSim.findOne({
                    where: {
                        status: 'FREE',
                        type: 'esim'
                    }
                });
                if (!plintronSim) throw new PlintronError(507, 'Sim cards are out');
                await plintronSim.update({status: 'BOOKED'});
                simPlanReq.plintronSimId = plintronSim.id;
            }

            simPlan = await UserSimPlan.create(simPlanReq);
            errCheckerPlintron(!simPlan?.id, 'Error save sim card and plan');

            product = await UserProduct.create({
                userId,
                productId: simPlan.id,
                action: 'sim_plan'
            });

            sum = Number(optimizePlan.plan.costBuyPlan);
            return {sum: sum, productId: product.id};
        } catch (e) {
            plintronLogger.error(e.message);
            try {
                if (simPlan) await simPlan.destroy();
                if (product) await product.destroy();
                if (delivery) await delivery.destroy();
            } catch (e) {
                throw new PlintronError(e.code || 0, e.message || "Error");
            }
            throw new PlintronError(e.code || 0, e.message || "Error");
        }
    }

    async checkBuySim(payId) {
        try {
            const userPay = await UserPay.findByPk(payId);
            if (userPay.status !== 'paid') {
                const paymentStatus = await paymentServices.changePaymentStatus(userPay);
                if (!paymentStatus) throw new PlintronError(503, 'Payment not confirmed');
                await userPay.update({status: 'paid'});
                await StripPay.update({payToken: null}, {where: {userPayId: userPay.id}});
            }
            if (userPay.action === 'bySimCard') {
                let products = await UserProduct.findAll({
                    where: {
                        id: {[Op.in]: userPay.productId},
                        action: 'sim_plan'
                    }
                });

                const user = await User.findByPk(userPay.userId);
                let orderList = [];

                for (const product of products) {
                    let userSimPlan = await UserSimPlan.findOne({
                        where: {id: product.productId},
                        include: [
                            {model: PlintronSim},
                            {
                                model: Plan, as: 'plan',
                                attributes: {exclude: ['createdAt', 'updatedAt']}
                            }
                        ]
                    });

                    if (userSimPlan.simType === 'esim') {
                        const accountDetails = await this.getAccountDetails(userSimPlan.PlintronSim.ICCID);
                        if (!accountDetails?.primary_imsi) throw new PlintronError(507, 'No SIM card information');
                        await PlintronSim.update({
                            status: 'NOT_ACTIVATED',
                            IMSI: accountDetails.primary_imsi,
                            MSISDN: accountDetails.msisdn
                        }, {where: {id: userSimPlan.plintronSimId}});
                    }

                    let index = (orderList.length > 0) ? orderList.findIndex(el => el.name === userSimPlan.plan.name) : -1;
                    if (index !== -1) orderList[index].count += 1;
                    else orderList.push({
                        name: userSimPlan.plan.name,
                        count: 1,
                        price: Number(userSimPlan.plan.costBuyPlan)
                    });
                }

                mailerServices.sender(user.email, {
                    order_number: userPay.id,
                    total_cost: userPay.sum,
                    payment_type: userPay.paymentType.charAt(0).toUpperCase() + userPay.paymentType.slice(1),
                    order_list: orderList,
                }, "Order", "order");
            }
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code || 0, e.message || "Error");
        }
    };

    async simActivate(productId, userId) {
        try {
            let simPlan = await UserSimPlan.findOne({
                where: {userId: userId, id: productId},
                include: [
                    {model: PlintronSim},
                    {model: PlintronPlan},
                    {model: Plan, as: 'plan'},
                    {model: Plan, as: 'plan'},
                    {model: Delivery},
                    {model: User}]
            });
            errCheckerPlintron(!simPlan, 'User sim plan not found');
            errCheckerPlintron(simPlan.PlintronSim.status === "BUSY", 'SIM card is already activated');

            let userProduct = await UserProduct.findOne({where: {productId: simPlan.id, action: 'sim_plan'}});

            let userPayDbQuery = {
                where: {
                    productId: {[Op.contains]: [userProduct.id]},
                    action: "bySimCard",
                    status: "paid",
                    userId: userId
                }
            };

            if (simPlan.User.companyId) {
                let company = await Company.findByPk(simPlan.User.companyId);
                let owner = await User.findByPk(company.ownerId);
                userPayDbQuery.where.userId = owner.id;
            }

            const userPay = await UserPay.findOne(userPayDbQuery);
            errCheckerPlintron(!userPay, 'SIM card not paid yet');
            errCheckerPlintron(simPlan.PlintronSim.type === 'physical'
                && (simPlan?.Delivery?.status !== ('delivered' || 'shipped')), 'SIM card has not been delivered yet');

            let allocatedMsisdn;
            try {
                let result = await this.activateSimAndSetPlan({
                    icc_id: simPlan.PlintronSim.ICCID,
                    zip_code: simPlan.User.zip,
                    plan_id: simPlan.PlintronPlan.planID
                });
                errCheckerPlintron(!result, 'Activate sim card failed');
                allocatedMsisdn = result?.allocated_msisdn
            } catch (e) {
                if (e.code && Number(e.code) !== 810)
                    throw new PlintronError(e.code || 0, e.message || "Error");
                allocatedMsisdn = simPlan.PlintronSim.MSISDN;
                allocatedMsisdn = simPlan.PlintronSim.IMSI;
            }

            const accountDetails = await this.getAccountDetails(simPlan.PlintronSim.ICCID);
            if (!accountDetails?.primary_imsi) throw new PlintronError(507, 'No SIM card information');

            await PlintronSim.update({
                status: 'BUSY',
                MSISDN: allocatedMsisdn,
                IMSI: accountDetails.primary_imsi
            }, {where: {id: simPlan.plintronSimId}});

            await UserSimPlan.update({status: 'active'}, {where: {id: simPlan.id}});
            await Plan.update({rating: (simPlan.plan.rating + 1)}, {where: {id: simPlan.plan.id}});
            await UserSimStatistic.create({sms: 0, min: 0, internet: 0, userSimPlanId: simPlan.id});

            const message = `SIM card successfully activated your number: ${allocatedMsisdn}`;
            mailerServices.sender(simPlan.User.email, message, "Sim activate", "sim/buySim");

            return {MSISDN: allocatedMsisdn, productId, userId, message};
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code || 0, e.message || "Error");
        }
    }

    async changeStatus(data) {
        try {
            let simPlan = await UserSimPlan.findOne({
                where: {userId: data.userId, id: data.productId},
                include: [{model: PlintronSim}]
            });
            errCheckerPlintron(!simPlan, 'User sim plan not found');
            errCheckerPlintron(!simPlan.PlintronSim, 'SIM card not attach');
            errCheckerPlintron(simPlan.PlintronSim.status !== "BUSY", 'SIM card not activated');

            await this.modifySubscriberStatus({
                icc_id: simPlan.PlintronSim.ICCID,
                status: data.status // A – Restore suspension, B – Suspend the subscriber, T – Temporary Black Listed.
            });
            await UserSimPlan.update({status: ((data.status === "A") ? 'active' : 'blocked')}, {where: {id: simPlan.id}});
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code || 0, e.message || "Error");
        }
    }

    async changeSim(data, userId = null, isAdmin = false) {
        let newSim, deliveryId;

        try {
            plintronLogger.req('---------------- Change sim ----------------');
            let optionsSimPlan = {
                where: {userId: userId, id: data.productId},
                include: [{model: PlintronSim}]
            };
            if (data.simId && isAdmin) optionsSimPlan = {
                include: [{
                    where: {id: data.simId},
                    model: PlintronSim
                }]
            };

            let userSimPlan = await UserSimPlan.findOne(optionsSimPlan);
            errCheckerPlintron(!userSimPlan, 'User sim plan not found');

            if (data.newSim && isAdmin && data.simType === 'physical') {
                let checkPlintronSim = await PlintronSim.findOne({where: {ICCID: data.newSim.ICCID}});
                errCheckerPlintron(checkPlintronSim, 'ICCID already in use');
                const accountDetails = await this.getAccountDetails(data.newSim.ICCID);
                errCheckerPlintron(!accountDetails?.primary_imsi, 'No SIM card information');
                data.newSim.MSISDN = accountDetails.msisdn;
                data.newSim.IMSI = accountDetails.primary_imsi;
                data.newSim.type = 'physical';
                newSim = await PlintronSim.create(data.newSim);
                deliveryId = await deliveryServices.create(data.delivery);
            } else {
                let options = {where: {status: 'FREE', type: data.simType}};
                if (data.newSimId && isAdmin) options.where.id = data.newSimId;
                newSim = await PlintronSim.findOne(options);
            }
            errCheckerPlintron(!newSim, 'Sim cards are out');

            if (!userSimPlan.PlintronSim && isAdmin) {
                plintronLogger.req('Type-1');
                await newSim.update({status: 'NOT_ACTIVATED'});
                if (userSimPlan.deliveryId) await Delivery.destroy({where: {id: userSimPlan.deliveryId}});
                await userSimPlan.update({
                    plintronSimId: newSim.id,
                    deliveryId,
                    simType: data.simType,
                    status: "not_active"
                });

            } else if (userSimPlan.PlintronSim && userSimPlan.PlintronSim.status === "NOT_ACTIVATED" && isAdmin) {
                plintronLogger.req('Type-2');
                await newSim.update({status: 'NOT_ACTIVATED'});
                await PlintronSim.update({status: (userSimPlan.PlintronSim.type === 'esim' ? 'FREE' : 'BLOCKED')}, {where: {id: userSimPlan.PlintronSim.id}});
                await userSimPlan.update({
                    plintronSimId: newSim.id,
                    deliveryId,
                    simType: data.simType,
                    status: "not_active"
                });

            } else if (userSimPlan.PlintronSim && (userSimPlan.PlintronSim.status === "BUSY" || isAdmin)) {
                plintronLogger.req('Type-3');
                plintronLogger.req(`MSISDN-${userSimPlan.PlintronSim.MSISDN} New sim IMSI-${newSim.IMSI}`);

                await this.changeSimPlintron({
                    msisdn: userSimPlan.PlintronSim.MSISDN,
                    new_iccid: newSim.ICCID
                });
                await newSim.update({status: 'NOT_ACTIVATED'});
                await PlintronSim.update({newIMSI: newSim.IMSI}, {where: {id: userSimPlan.PlintronSim.id}});
                await userSimPlan.update({deliveryId, status: "not_active"});
            } else throw new Error("Sim activate failed");
        } catch (e) {
            if (newSim) {
                if (data.simType === 'physical')
                    await newSim.destroy();
                else await newSim.update({status: 'FREE'});
            }
            plintronLogger.error(e.message);
            throw new PlintronError(e.code || 0, e.message || "Error");
        }
    };

    async unlocking(productId) {
        try {
            const userSimPlan = await UserSimPlan.findOne({
                where: {
                    status: {[Op.or]: ["not_paid", "blocked_paid"]},
                    id: productId,
                },
                include: [
                    {model: PlintronSim},
                    {model: Plan, as: 'plan'},
                    {
                        model: User,
                        include: [{model: Company}]
                    }
                ]
            })
            errCheckerPlintron(!userSimPlan, 'User sim plan not found');

            let date = new Date();
            let balance = Number(userSimPlan.User.balance);
            let planPrice = Number(userSimPlan.plan.costPerMonth);
            let payerId = userSimPlan.User.id;

            if (userSimPlan.User.companyId) {
                let owner = await User.findByPk(userSimPlan.User.Company.ownerId)
                balance = owner.balance;
                payerId = owner.id;
            }

            if (planPrice <= balance) {
                await this.modifySubscriberStatus({
                    icc_id: userSimPlan.PlintronSim.ICCID,
                    status: "A"
                });
                await User.update({balance: balance - planPrice}, {where: {id: payerId}});
                await UserSimPlan.update({
                    expireDate: date.setMonth(date.getMonth() + 1),
                    status: "active"
                }, {where: {id: userSimPlan.id}});
            } else throw new Error('Insufficient funds to pay');
            return "Unlock completed successfully";
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code || 0, e.message || "Error");
        }
    }

    async cancelPurchase(bySimCardPayId, userId) {
        try {
            let userPay = await UserPay.findOne({
                where: {
                    userId,
                    id: bySimCardPayId,
                    action: 'bySimCard',
                    status: {[Op.not]: 'paid'}
                }
            });

            if (!userPay) return "Cancel purchase successfully";

            let products = await UserProduct.findAll({
                where: {
                    productId: {[Op.in]: userPay.productId},
                    action: 'sim_plan'
                }
            });
            let userSimPlanIds = products.map((item) => {
                return item.productId
            });

            let userSimPlan = await UserSimPlan.findAll({
                where: {id: {[Op.in]: userSimPlanIds}}
            });

            let deliveryIds = userSimPlan.map((item) => {
                return item.deliveryId
            });

            if (userPay.paymentType === 'stripe') await StripPay.destroy({where: {userPayId: userPay.id}});
            await Delivery.destroy({where: {id: {[Op.in]: deliveryIds}}});
            await UserSimPlan.destroy({where: {id: {[Op.in]: userSimPlanIds}}});
            await UserProduct.destroy({where: {id: {[Op.in]: userPay.productId}}});
            await userPay.destroy();

            return "Cancel purchase successfully";
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code || 0, e.message || "Error");
        }
    }

    async switchingAnotherOperatorBooking(data, userId) {
        try {
            const userSimPlan = await UserSimPlan.findOne({
                where: {userId: userId, id: data.productId},
                include: [{model: PlintronSim}, {model: User}]
            });
            errCheckerPlintron(!userSimPlan, 'Error save sim card and plan');
            errCheckerPlintron(!userSimPlan?.PlintronSim, 'Sim card not found');
            errCheckerPlintron(userSimPlan.PlintronSim.status === 'BUSY', 'Sim card already activated');
            errCheckerPlintron(userSimPlan.PlintronSim.type === 'physical'
                && userSimPlan.PlintronSim.ICCID === data.ICCID, 'Sim card not confirmed');

            const pmsisdn = (data.pmsisdn.length === 10) ? '1' + data.pmsisdn : data.pmsisdn;
            await this.extMnpCreatePortin({
                icc_id: userSimPlan.PlintronSim.ICCID,
                pmsisdn: pmsisdn,
                osp_account_number: data.osp_account_number,
                osp_account_password: data.osp_account_password,
                name: data.name,
                address_line: data.address_line,
                city: data.city,
                state: data.state,
                zip: data.zip,
                zip_code: data.zip_code
            });

            await PlintronSim.update({PMSISDN: pmsisdn}, {where: {id: userSimPlan.plintronSimId}});

            return true;
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code || 0, e.message || "Error");
        }
    };

    async buySimCompany(userProducts, user) {
        try {
            let info = [];
            let productIds = [], sum = 0;
            for (const userProduct of userProducts) {
                try {
                    let userCheck = await User.findOne({
                        where: {
                            id: userProduct.userId,
                            companyId: user.company_id
                        }
                    });
                    errCheckerPlintron(!userCheck, "The specified user is not associated with a company");

                    const products = await this.buySim(userProduct.data, userProduct.userId);
                    productIds = [
                        ...productIds,
                        ...products.productIds
                    ];
                    sum += products.sum;
                    info = [
                        ...info,
                        ...products.info
                    ];
                } catch (e) {
                    plintronLogger.error(e.message);
                    info.push(e.message);
                }
            }

            if (productIds.length > 0) {
                const userPay = await UserPay.create({
                    action: "bySimCard", sum, userId: user.id,
                    paymentType: 'stripe', productId: productIds
                });
                const intent = await paymentServices.createPayment(userPay);
                return {stripId: intent.client_secret, userPayId: userPay.id, productIds, info, sum};
            }
            return {info};
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code || 0, e.message || "Error");
        }
    }

    async simActivateCompany(products, user) {
        let res = {sucsess: [], errors: []};

        for (const product of products) {
            try {
                let userCheck = await User.findOne({
                    where: {
                        id: product.userId,
                        companyId: user.company_id
                    }
                });
                errCheckerPlintron(!userCheck, "The specified user is not associated with a company");
                res.sucsess.push(await this.simActivate(product.productId, product.userId));
            } catch (e) {
                plintronLogger.error({product, error: e.message});
                res.errors.push({product, error: e.message})

            }
        }
        return res;
    }

    async generateESimCode(ICCID) {
        try {
            let req = {
                "ICCID": ICCID,
                "access_key": plintron.qr.access_key,
                "entity": plintron.qr.entity,
                "outPut_File_Base64_Flag": "B"
            };
            return await httpClient.httpReq(req, plintron.qr.url + "ESim/GetQrCode", 'post');
        } catch (e) {
            plintronLogger.error(e.message);
            throw new PlintronError(e.code || 0, e.message || "Error");
        }
    }

    async changeEsimStatus() {
        console.log('------------------- changeEsimStatus -----------------------------')
        await PlintronSim.update({status: 'FREE'}, {
            where: {
                status: 'BOOKED',
                type: 'esim',
                updatedAt: {[Op.lte]: new Date(Date.now() - 1000 * 60 * 60)}
            }
        });
    }

}


module.exports = {
    simCardClass: new SimCardClass()
};