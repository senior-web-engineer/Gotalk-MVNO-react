const {MainController} = require("./main.controller");
const {excludeAttributes} = require("../../Utils/dbHelpers");
const {userServices} = require("../../Services/hub.services");
const {simCardClass} = require("../../Services/Plintron/simCard");
const bcrypt = require('bcryptjs');
const db = require("../../Models/index");
const User = db.User;
const Company = db.Company;
const UserSimPlan = db.UserSimPlan;
const StripPay = db.StripPay;
const PlintronSim = db.PlintronSim;
const UserPlanHistory = db.UserPlanHistory;
const UserSimStatistic = db.UserSimStatistic;
const CompanyInvite = db.CompanyInvite;
const UserProduct = db.UserProduct;
const Delivery = db.Delivery;
const UserPay = db.UserPay;
const PlintronPlan = db.PlintronPlan;
const WholesalePlan = db.WholesalePlan;
const Plan = db.Plan;


class UserController extends MainController {

    constructor() {
        super(User);
    }

    getUser = async (req, res) => {
        try {
            let userProduct = await User.findByPk(req.params.id, {include: 'multiFactors'});
            return this.successRes(res, userProduct);
        } catch (e) {
            return this.errorRes(res, e);
        }
    }

    create = async (req, res) => {
        try {
            await userServices.create(req.body);
            return this.successRes(res, null, 201);
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    getDetails = async (req, res) => {
        try {
            return this.successRes(res, await User.findOne({
                where: {id: req.params.id},
                include: [
                    {model: UserPay},
                    {
                        model: UserSimPlan, as: 'UserSimPlans',
                        include: [
                            {
                                model: PlintronSim,
                                attributes: ['id', 'ICCID', 'IMSI', 'MSISDN', 'status', 'type']
                            },
                            {
                                model: Plan, as: 'plan',
                                attributes: {exclude: ['createdAt', 'updatedAt']}
                            },
                            {
                                model: PlintronPlan,
                                attributes: {exclude: ['createdAt', 'updatedAt']}
                            },
                            {
                                model: WholesalePlan,
                                attributes: {exclude: ['createdAt', 'updatedAt', 'WPS']}
                            },
                            {model: Delivery},
                        ]
                    },
                ]
            }));
        } catch (e) {
            return this.errorRes(res, e);
        }
    }

    delete = async (req, res) => {
        try {
            let user = await User.findOne({
                where: {id: req.params.id}, attributes: ['id'],
                include: [
                    {model: UserPay, attributes: ['id', 'paymentType']},
                    {
                        model: UserSimPlan, as: 'UserSimPlans', attributes: ['id'],
                        include: [
                            {model: PlintronSim, attributes: ['id', 'ICCID']},
                            {model: Delivery, attributes: ['id']},
                            {model: UserPlanHistory, attributes: ['id']},
                            {model: UserSimStatistic, attributes: ['id']},
                        ]
                    },
                ]
            });
            this.errChecker(!user, 'User not found');

            for (let item of user.UserSimPlans) {

                if (item?.PlintronSim) {
                    await simCardClass.deactivateSubscriber(item.ICCID);
                    await PlintronSim.update({status: 'BLOCKED'}, {where: {id: item.PlintronSim.id}});
                }
                for (let userSimStatistic of item?.UserSimStatistics) {
                    await UserSimStatistic.destroy({where: {id: userSimStatistic.id}});
                }
                for (let userPlanHistory of item?.UserPlanHistories) {
                    await UserPlanHistory.destroy({where: {id: userPlanHistory.id}});
                }
                await UserSimPlan.destroy({where: {id: item?.id}});
                if (item?.Delivery?.id) await Delivery.destroy({where: {id: item.Delivery.id}});
            }
            for (let item of user.UserPays) {
                if (item.paymentType === 'stripe')
                    await StripPay.destroy({where: {userPayId: item.id}});
                await UserPay.destroy({where: {id: item.id}});
            }
            await UserProduct.destroy({where: {userId: user.id}});

            const company = await Company.findOne({where: {ownerId: user.id}, attributes: ['id']});
            if (company) {
                await CompanyInvite.destroy({where: {companyId: company.id}});
                await User.update({companyId: null}, {where: {companyId: company.id}});
                await company.destroy();
            }
            await User.destroy({where: {id: user.id}});

            this.successRes(res, {message: "Deleted successfully"});
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    me = async (req, res) => {
        try {
            let {user} = req;
            user = await User.findByPk(user.id, {include: 'multiFactors'});
            const company = await Company.findOne({where: {ownerId: user.id}});
            const data = {
                ...excludeAttributes(user.dataValues, ['password', 'createdAt', 'updatedAt']), company
            };
            return this.successRes(res, data);
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    update = async (req, res) => {
        try {
            let {user} = req, data = req.body, userId = user.id, dbReq = data;
            if (user.role === 'Owner') {
                userId = data.userId;
                if (data.password) dbReq.password = bcrypt.hashSync(data.password, 8);
            } else
                dbReq = excludeAttributes(dbReq, ['email', 'password']);

            const result = await User.update(dbReq, {where: {id: userId}});
            return result == 1 ?
                this.successRes(res, {message: "User was updated successfully"}) :
                this.successRes(res, {message: `Cannot update User with id = ${userId}. Maybe User was not found or req.body is empty`}, 404);
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    ownerBoard = (req, res) => {
        res.status(200).json("Owner Content.");
    };

    managerBoard = (req, res) => {
        res.status(200).json("Manager Content.");
    };

    viewerBoard = (req, res) => {
        res.status(200).json("Viewer Content.");
    };

    customerBoard = (req, res) => {
        res.status(200).json("Customer Content.");
    };

    // QR Generator demonstration
    qr = async (req, res) => {
        const {QrGenerator} = require("../../Utils/qrGenerator");
        let generator = new QrGenerator({message: "Test"});
        if (req.query.type === 'img')
            return res.end(await generator.qr());
        else if (req.query.type === 'file')
            return res.json(await generator.qrFile());
        return res.status(404).json({message: "Not found"});
    }
}

module.exports = {
    UserController
};
