const {MainController} = require("./main.controller");
const db = require("../../Models/index");
const {queueConstructor} = require("../../Utils/dbHelpers");
const {formatUnit} = require("../../Utils/memoryConvertor");
const {planClass} = require("../../Services/Plintron/plan");
const {plintronLogger} = require("../../Utils/logger");
const {paymentServices} = require("../../Services/hub.services");
const {getPagination, getPagingData} = require("../../Utils/dbHelpers");
const Plan = db.Plan;
const UserPay = db.UserPay;
const User = db.User;

class PlanController extends MainController {

    constructor() {
        super(Plan);
    }

    findAll = async (req, res) => {
        try {
            const {limit, offset, page} = getPagination(req.query.page, req.query.per_page);
            let options = {
                limit,
                offset,
                order: [['id', 'DESC']]
            };
            if (req.query?.popular === true) options.order = [['rating', 'DESC']];
            if (req.query?.isCompany) options.where = {isCompany: req.query.isCompany};
            let plans = await Plan.findAndCountAll(options);
            plans.rows = plans.rows.map(plan=>{
                plan.internetCount = formatUnit(plan.internetCount);
                return plan;
            });
            return this.successRes(res, getPagingData(plans, page, limit));
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    findOne = async (req, res) => {
        try {
            let options = queueConstructor(req, res, {where: {id: req.params.id}}, this.Model);
            let plan = await this.Model.findOne(options);
            plan.internetCount = formatUnit(plan.internetCount);
            return this.successRes(res,plan);
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    changePlan = async (req, res) => {
        try {
            let {user} = req;
            let body = req.body;

            if (user.role !== 'Owner') {
                let userCheck = await User.findByPk(user.id);
                this.errChecker(userCheck.companyId, "Only the owner of the company can change the tariff plan");
            }
            const userId = (user.role === 'Owner') ? (req.body.userId || user.id) : user.id;

            const result = await planClass.changePlan(body.productId, body.newPlanId);
            let dbReq = {
                action: "changePlan", sum: result.sum, userId,
                paymentType: 'stripe',
                productId: [result.productId]
            };
            if (result.sum === 0){
                dbReq.status = 'paid';
                dbReq.paymentType = 'local';
            }
            const userPay = await UserPay.create(dbReq);

            if (result.sum > 0) {
                const intent = await paymentServices.createPayment(userPay);
                return this.successRes(res, {stripId: intent.client_secret, userPayId: userPay.id});
            } else {
                await planClass.confirmingPlanChange({payId: userPay.id});
                return this.successRes(res, {message: "Tariff plan has been successfully updated"});
            }

        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    confirmingPlanChange = async (req, res) => {
        try {
            await planClass.confirmingPlanChange(req.body);
            return this.successRes(res, {message: "Tariff plan has been successfully updated"});
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    getProductDetails = async (req, res) => {
        try {
            return this.successRes(res, await planClass.getProductDetails(req.params.id));
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    getProductDetailCompany = async (req, res) => {
        try {
            let body = req.body;
            let data = [];
            for (const userSimPlan of body) {
                const item = await planClass.getProductDetails(userSimPlan);
                data.push(item)
            }
            return this.successRes(res, data);
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    getProductHistory = async (req, res) => {
        try {
            let data = req.query;
            data.productId = req.params.id;
            return this.successRes(res, await planClass.getHistory(data));
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    changePlanCompany = async (req, res) => {
        try {
            let {user} = req;
            let body = req.body;
            let resData = {sucsess: [], errors: []};
            let productIds = [], sum = 0;

            for (const product of body) {
                try {
                    const result = await planClass.changePlan(product.productId, product.newPlanId);
                    if (result?.sum) {
                        productIds.push(result.productId);
                        sum += result.sum;
                    }
                    resData.sucsess.push(result);
                } catch (e) {
                    resData.errors.push({productId: product.productId, message: e.message});
                }
            }

            let dbReq = {
                action: "changePlanCompany", sum, userId: user.id,
                paymentType: 'stripe',
                productId: productIds
            };
            if (sum === 0){
                dbReq.status = 'paid';
                dbReq.paymentType = 'local';
            }
            const userPay = await UserPay.create(dbReq);

            if (sum > 0) {
                const intent = await paymentServices.createPayment(userPay);
                return this.successRes(res, {stripId: intent.client_secret, userPayId: userPay.id, message: resData});
            } else {
                await planClass.confirmingPlanChange({payId: userPay.id});
                return this.successRes(res, resData);
            }
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    confirmingPlanChangeCompany = async (req, res) => {
        try {
            let body = req.body;
            let resData = {sucsess: [], errors: []};

            for (const item of body) {
                try {
                    await planClass.confirmingPlanChange(item);
                    resData.sucsess.push(item);
                } catch (e) {
                    resData.errors.push({data: item, message: e.message});
                }
            }
            return this.successRes(res, resData);
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

}

module.exports = {
    PlanController
};