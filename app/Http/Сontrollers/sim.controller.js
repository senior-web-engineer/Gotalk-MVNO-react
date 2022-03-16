const db = require("../../Models/index");
const {simCardClass} = require("../../Services/Plintron/simCard");
const {plintronLogger} = require("../../Utils/logger");
const PlintronSim = db.PlintronSim;
const UserSimPlan = db.UserSimPlan;
const UserProduct = db.UserProduct;
const PlintronPlan = db.PlintronPlan;
const Plan = db.Plan;
const User = db.User;
const UserPay = db.UserPay;
const Sequelize = require('sequelize');
const parserSim = require("../../Services/Plintron/Utils/simCardParse");
const uploadFile = require("../Middleware/upload.middleware");
const fs = require("fs-extra");
const {PlintronError} = require("../../Exceptions/plintronError");
const {filesystems, plintron} = require("../../../config/index.config");
const {errCheckerPlintron} = require("../../Exceptions/plintronError");
const {MainController} = require("./main.controller");
const Op = Sequelize.Op;

class SimController extends MainController {

    constructor() {
        super(PlintronSim);
    }

    create = async (req, res) => {
        try {
            const body = req.body;
            const accountDetails = await simCardClass.getAccountDetails(body.ICCID);
            if (!accountDetails?.primary_imsi) throw new PlintronError(507, 'SIM card not fount in Plintron');
            body.IMSI = accountDetails.primary_imsi;
            body.MSISDN = accountDetails.msisdn;
            return this.successRes(res, await PlintronSim.create(body));
        } catch (e) {
            return this.errorRes(res, e);
        }
    };


    update = async (req, res) => {
        try {
            const body = req.body;
            const plintronSim = await PlintronSim.findOne({
                where: {
                    id: req.params.id,
                    status: {[Op.in]: ["NOT_ACTIVATED", "FREE"]}
                }
            });
            this.errChecker(!plintronSim,'Sim card not found');
            const accountDetails = await simCardClass.getAccountDetails(body.ICCID);
            if (!accountDetails?.primary_imsi) throw new PlintronError(507, 'SIM card not fount in Plintron');
            body.IMSI = accountDetails.primary_imsi;
            body.MSISDN = accountDetails.msisdn;
            const result = await plintronSim.update(body);
            return result == 1 ?
                this.successRes(res, {message: "Updated successfully"}) :
                this.successRes(res, {message: "Cannot update"}, 404)
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    getUserProducts = async (req, res) => {
        try {
            let {user} = req;
            let simInfo = [];
            let userProduct = await UserProduct.findAll({
                where: {userId: user.id, action: "sim_plan"},
                attributes: ['productId'],
                raw: true
            });
            userProduct = userProduct.map((item) => {
                return item.productId
            });
            let userSimPlan = await UserSimPlan.findAll({
                where: {id: {[Op.in]: userProduct}},
                include: [
                    {model: PlintronSim},
                    {
                        model: PlintronPlan,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {model: Plan, as: 'plan'}
                ]
            });

            for (const item of userSimPlan) {

                if (!item.plintronSimId) {
                    const product = await UserProduct.findOne({
                        where: {
                            productId: item.id,
                            action: 'sim_plan',
                        },
                        order: [['createdAt', 'ASC']]
                    });
                    const bySimCardPay = await UserPay.findOne({
                        where: {
                            productId: {[Op.contains]: [product?.id]},
                            action: 'bySimCard'
                        },
                        order: [['createdAt', 'ASC']]
                    });

                    if (bySimCardPay?.id && item.simType === 'physical') {

                        let elem = (bySimCardPay.status === 'paid') ? {
                            userSimPlanId: item?.id,
                            planName: item.plan?.name,
                            productStatus: item.status,
                            simType: item.simType,
                        } : {bySimCardPayId: bySimCardPay?.id};
                        simInfo.push(elem)
                    } else if (bySimCardPay?.id) simInfo.push({bySimCardPayId: bySimCardPay?.id});
                    continue;
                }

                let phone = item.PlintronSim?.MSISDN;
                if (item.PlintronSim.status === "BUSY" && phone.length !== 10) {
                    const accountDetails = await simCardClass.getAccountDetails(item.PlintronSim.ICCID);
                    phone = accountDetails.msisdn;
                    await PlintronSim.update({MSISDN: phone}, {where: {id: item.PlintronSim.id}});
                }

                let elem = {
                    userSimPlanId: item?.id,
                    planName: item.plan?.name,
                    productStatus: item.status,
                    simStatus: item.PlintronSim.status,
                    simType: item.PlintronSim.type,
                    phone
                };

                simInfo.push(elem)
            }
            return this.successRes(res, simInfo);
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    activatePhysicalSim = async (req, res) => {
        let {user} = req;
        let body = req.body;
        try {
            const userId = (user.role === 'Owner') ? body.userId : user.id;
            const plintronSim = await PlintronSim.findOne({
                where: {
                    ICCID: body.ICCID,
                    status: 'NOT_ACTIVATED'
                },
                include: [
                    {
                        model: UserSimPlan,
                        where: {userId: userId},
                    }
                ]
            });
            this.errChecker(!plintronSim, 'ICCID not found');
            const result = await simCardClass.simActivate(plintronSim.UserSimPlan.id, userId);
            return this.successRes(res, result);
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    activateESim = async (req, res) => {
        let {user} = req;
        let body = req.body;
        try {
            const userId = (user.role === 'Owner') ? body.userId : user.id;
            let simPlan = await UserSimPlan.findOne({
                where: {userId: userId, id: body.productId},
                include: [{model: PlintronSim, where: {type: "esim"}}]
            });
            errCheckerPlintron(!simPlan, 'User sim plan not found');
            const result = await simCardClass.simActivate(body.productId, userId);
            return this.successRes(res, result);
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    eSimQr = async (req, res) => {
        let {user} = req;
        let query = req.query;
        try {
            const userId = (user.role === 'Owner') ? query.userId : user.id;
            let simPlan = await UserSimPlan.findOne({
                where: {userId: userId, id: query.productId, status: "active"},
                include: [{model: PlintronSim, where: {type: "esim"}}]
            });
            errCheckerPlintron(!simPlan, 'User sim plan not found');
            const result = await simCardClass.generateESimCode(simPlan.PlintronSim.ICCID);
            return this.successRes(res, result);
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    changeStatus = async (req, res) => {
        let body = req.body;
        try {
            await simCardClass.changeStatus(body);
            return this.successRes(res, {message: "SIM card status has been successfully updated"});
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    changeSim = async (req, res) => {
        let {user} = req;
        let body = req.body;

        try {
            const isAdmin = user.role === 'Owner';
            const userId = isAdmin ? body.userId : user.id;
            await simCardClass.changeSim(body, userId, isAdmin);
            return this.successRes(res, {message: "SIM card updated successfully"});
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    addPhysicalSim = async (req, res) => {
        let body = req.body;
        try {
            let userSimPlan = await UserSimPlan.findByPk(body.productId);
            this.errChecker(!userSimPlan, 'User Sim Plan not found');
            body.sim.status = 'NOT_ACTIVATED';
            body.sim.type = 'physical';
            const accountDetails = await simCardClass.getAccountDetails(body.sim.ICCID);
            if (!accountDetails?.primary_imsi) throw new PlintronError(507, 'No SIM card information');
            body.sim.IMSI = accountDetails.primary_imsi;
            body.sim.MSISDN = accountDetails.msisdn;
            const plintronSim = await PlintronSim.create(body.sim)
            await userSimPlan.update({plintronSimId: plintronSim.id});
            return this.successRes(res, {message: "SIM card create successfully"});
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    import = async (req, res) => {
        try {
            await parserSim.import();
            return this.successRes(res, {message: "SIM card import successfully"});
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    upload = async (req, res) => {
        try {
            await uploadFile(req, res);
            errCheckerPlintron(req.file === undefined, 'Please upload a file');
            const fileName = req.file.filename;
            fs.moveSync(filesystems.rootPrivate.concat(fileName), plintron.simStorage.newSimFolder.concat(fileName));
            return this.successRes(res, {message: "SIM card upload successfully"});
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    };

    buySimCompany = async (req, res) => {
        try {
            let {user} = req;
            let body = req.body;
            const result = await simCardClass.buySimCompany(body, user);
            return this.successRes(res, result);
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    }

    switchingAnotherOperatorBooking = async (req, res) => {
        try {
            let {user} = req;
            const userId = (user.role === 'Owner') ? req.body.userId : user.id;
            await simCardClass.switchingAnotherOperatorBooking(req.body, userId);
            return this.successRes(res, {message: "Number porting request accepted"});
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    unlocking = async (req, res) => {
        try {
            let body = req.body;
            const result = await simCardClass.unlocking(body.productId);
            return this.successRes(res, result);
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    }

    cancelPurchase = async (req, res) => {
        try {
            let body = req.body;
            let {user} = req;
            const userId = (user.role === 'Owner') ? req.body.userId : user.id;
            const result = await simCardClass.cancelPurchase(body.bySimCardPayId, userId);
            return this.successRes(res, result);
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    }

    checkBuySimCompany = async (req, res) => {
        try {
            let body = req.body;
            await simCardClass.checkBuySim(body.payId);
            return this.successRes(res, {message: "Purchase confirmed"});
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    }

    simActivateCompany = async (req, res) => {
        try {
            let {user} = req;
            const userData = (user.role === 'Owner') ? await User.findByPk(req.body.userId) : user;
            const result = await simCardClass.simActivateCompany(req.body, userData);
            return this.successRes(res, result);
        } catch (e) {
            plintronLogger.error(e.message);
            return this.errorRes(res, e);
        }
    }
}

module.exports = {
    SimController
};