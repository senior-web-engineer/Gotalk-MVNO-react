const {MainController} = require("./main.controller");
const db = require("../../Models/index");
const {getPagination, getPagingData} = require("../../Utils/dbHelpers");
const Delivery = db.Delivery;
const UserSimPlan = db.UserSimPlan;
const PlintronSim = db.PlintronSim;
const PlintronPlan = db.PlintronPlan;
const Plan = db.Plan;
const User = db.User;
const UserPay = db.UserPay;
const UserProduct = db.UserProduct;
const WholesalePlan = db.WholesalePlan;
const Company = db.Company;
const UserSimPort = db.UserSimPort;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class OrdersController extends MainController {

    constructor() {
        super(null);
    }

    findAll = async (req, res) => {
        try {
            const {limit, offset, page} = getPagination(req.query.page, req.query.per_page);
            let options = {
                attributes: ['id', 'status', 'simType'],
                order: [['id', 'DESC']],
                include: [
                    {
                        model: PlintronSim,
                        attributes: ['ICCID', 'IMSI', 'MSISDN', 'status'],
                    },
                    {
                        model: Plan, as: 'plan',
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: User,
                        attributes: {exclude: ['createdAt', 'updatedAt', 'password']}
                    },
                    {
                        model: Delivery
                    }
                ]
            };
            const userSimPlans = await UserSimPlan.findAndCountAll(options);


            let userSimPlanIds = userSimPlans.rows.map((item) => {
                return item.id;
            });

            const products = await UserProduct.findAll({
                where: {
                    productId: {
                        [Op.in]: userSimPlanIds
                    },
                    action: 'sim_plan',
                },
                order: [['createdAt', 'ASC']]
            });

            let productsIds = products.map((item) => {
                return item.id;
            });

            let payOption = {
                where: {
                    productId: {[Op.contained]: productsIds},
                    action: 'bySimCard'
                },
                order: [['createdAt', 'ASC']]
            };
            if (req.query.status && req.query.status !== 'all')
                payOption.where.status = {[Op.not]: "initial"};

            const pays = await UserPay.findAll(payOption);

            let result = {
                count: 0,
                rows: []
            };

            for (let userSimPlan of userSimPlans.rows) {
                if (userSimPlan?.PlintronSim && userSimPlan?.PlintronSim?.status !== 'NOT_ACTIVATED') continue;
                let product = products.find(item => item.productId === userSimPlan.id);
                let pay = pays.find(item => item.productId.indexOf(product.id) !== -1);
                if (pay) {
                    result.rows.push({
                        id: userSimPlan.id,
                        delivery: (userSimPlan.Delivery) ? {
                            id: userSimPlan.Delivery.id,
                            status: userSimPlan.Delivery.status,
                        } : null,
                        status: userSimPlan.status,
                        simType: userSimPlan.simType,
                        PlintronSim: userSimPlan.PlintronSim || null,
                        planName: userSimPlan?.plan?.name || '',
                        pay: pay,
                        user: userSimPlan.User,
                    });
                    result.count++;
                }
            }
            result.rows = result.rows.slice(offset, offset + limit);

            return this.successRes(res, getPagingData(result, page, limit))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    findOne = async (req, res) => {
        try {
            const userSimPlan = await UserSimPlan.findOne({
                where: {id: req.params.id},
                attributes: ['id', 'status', 'simType'],
                include: [
                    {
                        model: PlintronSim,
                        attributes: ['ICCID', 'IMSI', 'MSISDN', 'status']
                    },
                    {
                        model: PlintronPlan,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: Plan, as: 'plan',
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: WholesalePlan,
                        attributes: {exclude: ['createdAt', 'updatedAt', 'WPS']}
                    },
                    {model: Delivery},
                    {
                        model: User,
                        attributes: {exclude: ['createdAt', 'updatedAt', 'password', 'companyId']},
                        include: [
                            {
                                model: Company,
                                attributes: {exclude: ['createdAt', 'updatedAt']}
                            }
                        ]
                    },
                    {
                        model: UserSimPort
                    }
                ]
            });
            this.errChecker(userSimPlan?.PlintronSim && userSimPlan?.PlintronSim?.status !== 'NOT_ACTIVATED', "Order not found");
            return this.successRes(res, userSimPlan)
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    destroy = async (req, res) => {
        try {
            const userSimPlan = await UserSimPlan.findOne({
                where: {id: req.params.id},
                include: [{model: PlintronSim}, {model: Delivery}]
            });
            this.errChecker(userSimPlan?.PlintronSim && userSimPlan?.PlintronSim?.status !== 'NOT_ACTIVATED', "Order not found");
            await UserSimPlan.destroy({where: {id: userSimPlan.id}});
            if (userSimPlan?.PlintronSim && req.query.isPayd === true) await PlintronSim.update({status: "FREE"}, {where: {id: userSimPlan.PlintronSim.id}});
            if (userSimPlan?.Delivery) await Delivery.destroy({where: {id: userSimPlan.Delivery.id}});
            return this.successRes(res, {message: "Заказ успешно удален"});
        } catch (e) {
            return this.errorRes(res, e);
        }
    };
}

module.exports = {
    OrdersController
};