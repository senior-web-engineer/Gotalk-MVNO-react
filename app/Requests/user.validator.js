const {body} = require('express-validator');
const db = require("../Models");
const User = db.User;

exports.rule = () => {

    let rule = [
        body('role','Invalid role').isString().isIn(User.ROLE),
        body('status','Invalid status').optional().isString().isIn(User.STATUSE),
        body('email', 'Invalid email').exists().isEmail().custom(value => {
            return User.findOne({where: {email: value}}).then(user => {
                if (user) return Promise.reject('E-mail already in use');
            });
        }),
        body('firstName').exists().isLength({ min:1, max:255 }).isString(),
        body('lastName').exists().isLength({ min:1, max:255 }).isString(),
        body('phone').isMobilePhone().optional(),
        body('country').isString().optional(),
        body('city').isString().optional(),
        body('street').isString().optional(),
        body('apartment').isString().optional(),
        body('zip').matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "i").optional()
    ];

    return rule;
}