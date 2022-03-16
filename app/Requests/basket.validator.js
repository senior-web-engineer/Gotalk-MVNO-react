const {body} = require('express-validator');
const db = require("../Models");
const User = db.User;

exports.rule = (type) => {

    switch (type) {
        case "buy":
            return [
                body('user.password', "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",)
                    .isLength({min: 8}).exists()
                    .matches(/^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,),
                body('user').exists().isObject(),
                body('user.email').exists().isEmail(),
                body('user.firstName').exists().isLength({min: 1, max: 255}).isString(),
                body('user.lastName').exists().isLength({min: 1, max: 255}).isString(),
                body('user.phone').isString().optional(),
                body('user.city').isString().optional(),
                body('user.country').isString().optional(),
                body('user.street').isString().optional(),
                body('user.apartment').isString().optional(),
                body('user.zip').matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "i").exists(),
                body('products').isArray().isLength({min: 1}).exists(),
                body('products.*.isEsim').isBoolean().exists(),
                body('products.*.count').isInt().exists(),
                body('products.*.planId').isInt().exists(),
            ];
    }
}