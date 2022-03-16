const {FileController} = require("./file.controller");
const {getPagingData, getPagination, queueConstructor} = require("../../Utils/dbHelpers");

class MainController extends FileController {

    constructor(Model) {
        super();
        this.Model = Model;
    }

    create = async (req, res) => {
        try {
            return this.successRes(res, await this.Model.create(req.body));
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    findAll = async (req, res) => {
        try {
            const {limit, offset, page} = getPagination(req.query.page, req.query.per_page);
            let options = queueConstructor(req, res, {limit, offset, order: [['id', 'DESC']]}, this.Model);
            return this.successRes(res, getPagingData(await this.Model.findAndCountAll(options), page, limit))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    findOne = async (req, res) => {
        try {
            let options = queueConstructor(req, res, {where: {id: req.params.id}}, this.Model);
            return this.successRes(res, await this.Model.findOne(options))
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    update = async (req, res) => {
        try {
            let options = queueConstructor(req, res, {where: {id: req.params.id}}, this.Model);
            const result = await this.Model.update(req.body, options);
            return result == 1 ?
                this.successRes(res, {message: "Updated successfully"}) :
                this.successRes(res, {message: "Cannot update"}, 404)
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    delete = async (req, res) => {
        try {
            let options = queueConstructor(req, res, {where: {id: req.params.id}}, this.Model);
            const result = await this.Model.destroy(options);
            return result == 1 ?
                this.successRes(res, {message: "Deleted successfully"}) :
                this.successRes(res, {message: "Cannot delete"}, 404)
        } catch (e) {
            return this.errorRes(res, e);
        }
    };

    successRes = (res, data = null, code = 200) => {
        return res.status(code).json({payload: data});
    };

    errorRes = (res, e, code = 500) => {
        return res.status(code).json({payload: {code: e.code || 0, message: e.message || "Error"}});
    };

    errChecker = (condition,message) => {
        if (condition)
            throw new Error(message);
    }

}

module.exports = {
    MainController
};