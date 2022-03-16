const {body} = require('express-validator');
const db = require("../Models");
const Company = db.Company;
const User = db.User;


exports.rule = (type) => {

    switch (type) {

        case "create":
            return [
                body('name').exists().isString().isLength({min: 1, max: 255}).custom(value => {
                    return Company.findOne({where: {name: value}}).then(val => {
                        if (val) return Promise.reject('Name already in use');
                    });
                }),
                body('ownerId').exists().isInt().custom(value => {
                    return User.findByPk(value).then(val => {
                        if (!val) return Promise.reject('User not found');
                    });
                }),
                body('role').isString().isIn(Company.ROLE)
            ];
        case "update":
            return [
                body('name').exists().isString().isLength({min: 1, max: 255}).custom(value => {
                    return Company.findOne({where: {name: value}}).then(val => {
                        if (val) return Promise.reject('Name already in use');
                    });
                }),
                body('role').isString().optional().isIn(Company.STATUSE)
            ];
        case "attachUser":
            return [
                body('action', 'Invalid action').exists().isString().isIn(['attach']),
                body('user_ids', 'Invalid user ids').isArray().exists(),
                body('user_ids.*', 'Invalid user ids item').isInt().exists(),
            ];
        case "userInvite":
            return [
                body('email').exists().isString().isLength({min: 1, max: 255}).custom(value => {
                    return User.findOne({where: {email: value}}).then(user => {
                        if (user) return Promise.reject('E-mail already in use');
                    });
                })
            ];
    }
}