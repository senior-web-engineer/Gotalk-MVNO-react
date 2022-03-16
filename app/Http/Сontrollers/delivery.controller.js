const {MainController} = require("./main.controller");
const {deliveryServices} = require("../../Services/hub.services");
const db = require("../../Models/index");
const {includeAttributes, getPagination, getPagingData} = require("../../Utils/dbHelpers");
const Delivery = db.Delivery;
const UserSimPlan = db.UserSimPlan;
const PlintronSim = db.PlintronSim;
const User = db.User;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class DeliveryController extends MainController {

    constructor() {
        super(Delivery);
    }

    findAll = async (req, res) => {
        try {
            const {limit, offset, page} = getPagination(req.query.page, req.query.per_page);
            let options = {limit, offset, where: {status: {[Op.not]: "delivered"}}};
            if (Boolean(req.query.all) === true) options.where.status = {[Op.not]: null};
            return this.successRes(res, getPagingData(await this.Model.findAndCountAll(options), page, limit))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    findOne = async (req, res) => {
        try {
            return this.successRes(res, await this.Model.findOne({
                where: {id: req.params.id},
                include: [
                    {
                        model: UserSimPlan,
                        include: [
                            {
                                model: PlintronSim,
                                attributes: ['ICCID', 'IMSI', 'MSISDN']
                            },
                            {
                                model: User,
                                attributes: {exclude: ['createdAt', 'updatedAt', 'password']}
                            }
                        ]
                    },
                ]
            }))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    create = async (req, res) => {
        try {
            return this.successRes(res, {deliveryId: await deliveryServices.create(req.body, true)});
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    update = async (req, res) => {
        try {
            let {user} = req;
            let body = req.body;
            if (user.role !== 'Owner') {
                const userSimPlan = await UserSimPlan.findOne({
                    where: {userId: user.id, deliveryId: req.params.id},
                    include: [{model: Delivery}]
                });
                this.errChecker(!userSimPlan || userSimPlan.Delivery.status !== 'processed', 'Shipping address can no longer be changed');
                body = includeAttributes(body, ['firstName', 'lastName', 'country', 'city', 'street', 'apartment', 'zip']);
            } else {
                const userSimPlan = await UserSimPlan.findOne({
                    where: {deliveryId: req.params.id},
                    include: [{model: Delivery}, {model: PlintronSim}]
                });
                this.errChecker(!userSimPlan || !userSimPlan.PlintronSim, 'You need to add a SIM card before changing the delivery status');
            }

            let result = (body.status === 'delivered') ?
                await deliveryServices.delivered(req.params.id) :
                await Delivery.update(body, {where: {id: req.params.id}});

            return result == 1 ?
                this.successRes(res, {message: "Updated successfully"}) :
                this.successRes(res, {message: "Cannot update"}, 404)
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    delete = async (req, res) => {
        try {
            const result = await Delivery.destroy({where: {id: req.params.id}});
            await UserSimPlan.update({deliveryId: null}, {where: {deliveryId: req.params.id}});
            return result == 1 ?
                this.successRes(res, {message: "Deleted successfully"}) :
                this.successRes(res, {message: "Cannot delete"}, 404)
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

}

module.exports = {
    DeliveryController
};