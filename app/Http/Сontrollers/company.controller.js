const {MainController} = require("./main.controller");
const {mailerServices} = require("../../Services/mailer.services");
const db = require("../../Models/index");
const {simCardClass} = require("../../Services/Plintron/simCard");
const {v4} = require('uuid');
const Company = db.Company;
const User = db.User;
const UserPay = db.UserPay;
const UserSimPlan = db.UserSimPlan;
const PlintronSim = db.PlintronSim;
const CompanyInvite = db.CompanyInvite;
const Sequelize = require('sequelize');
const {getPagingData, getPagination} = require("../../Utils/dbHelpers");
const Op = Sequelize.Op;

class CompanyController extends MainController {
    constructor() {
        super(Company);
    }

    userList = async (req, res) => {
        try {
            const {user} = req;

            const {limit, offset, page} = getPagination(req.query.page, req.query.per_page);
            let options = {
                limit, offset, include: [
                    {
                    model: UserSimPlan, as: 'UserSimPlans',
                    attributes: ["id", "status", "expireDate",'planId']
                    }
                ],
                where: {companyId: user.company_id, status: {[Op.not]: "delete"}}
            };
            if (req.query.status){
                if (req.query.status === 'all') delete options.where.status;
                else options.where.status = req.query.status;
            }
            return this.successRes(res, getPagingData(await User.findAndCountAll(options), page, limit))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    pay = async (req, res) => {
        try {
            let {user} = req;
            const {limit, offset, page} = getPagination(req.query.page, req.query.per_page);
            let options = {
                limit, offset,
                attributes: ["id", "action", "sum",'status','type','productId'],
                where: {
                    userId: user.id,
                    status: { [Op.not]: "paid" }
                }
            };
            return this.successRes(res, getPagingData(await UserPay.findAndCountAll(options), page, limit))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    changeStatus = async (req, res) => {
        try {
            let {user} = req;
            const body = req.body;
            user = await User.findOne({
                where: {
                    id: body.userId,
                    companyId: user.company_id
                },
                include: [{model: UserSimPlan, include: [{model: PlintronSim}]},]
            });
            this.errChecker(!user, "You do not have access to copy this user");

            let dbReq = {status: 'company_blocked'};
            let status = "B";
            if (body.action === 'activate') {
                this.errChecker(user.status !== 'company_blocked' || user.UserSimPlan.status !== 'company_blocked',
                    "You can not activate the user contact the administration");
                dbReq.status = 'active';
                status = 'A';
            } else if (body.action === 'delete') {
                dbReq.status = 'delete';
            }

            await simCardClass.modifySubscriberStatus({
                icc_id: user.UserSimPlan.PlintronSim.ICCID,
                status: status
            });
            await User.update(dbReq, {where: {id: user.id}})
            await UserSimPlan.update(dbReq, {where: {userId: user.id}})
            return this.successRes(res, `User successfully ${body.action}`);
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    usersCompany = async (req, res) => {
        try {
            const {user} = req;
            const {user_ids} = req.body;
            const result = await User.update({companyId: user.company_id}, {where: {id: {[Op.between]: user_ids}}});
            return this.successRes(res, result);
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    userInvite = async (req, res) => {
        try {
            const {user} = req;
            const {email} = req.body;
            const companyInvite = await CompanyInvite.create({
                companyId: user.company_id,
                email: email,
                invite: v4()
            });
            mailerServices.sender(email, {invite: companyInvite.invite}, "Invite", "company/userInvite");
            return this.successRes(res,'Invite successfully sent');
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

}

module.exports = {
    CompanyController
};