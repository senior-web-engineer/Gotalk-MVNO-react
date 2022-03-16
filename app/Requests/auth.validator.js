const {body} = require('express-validator');
const db = require("../Models");
const User = db.User;

exports.rule = (type) => {

    let rules = [];
    switch (type) {
        case "reset":
            rules = [
                body('email').exists().isEmail().custom(value => {
                    return User.findOne({where: {email: value}}).then(user => {
                        if (!user) return Promise.reject('E-mail not found');
                    })
                }),
                body('redirectUrl').exists().isString()
            ]
            break;
        case "set":
            rules.push(body('password', "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",)
                .isLength({min: 8}).exists()
                .matches(/^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,));
            rules.push(body('passwordConfirm', "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",)
                .isLength({min: 8}).exists()
                .matches(/^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,));
            rules.push(body('token').isString().exists());
            break;
        case 'signup':
            rules = [
                body('company').isObject().optional(),
                body('password', "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",)
                    .isLength({min: 8}).exists()
                    .matches(/^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,),

                body('email', 'Invalid email').exists().isEmail().custom(value => {
                    return User.findOne({where: {email: value}}).then(user => {
                        if (user) return Promise.reject('E-mail already in use');
                    })
                }),
                body('firstName').exists().isLength({min: 1, max: 255}).isString(),
                body('lastName').exists().isLength({min: 1, max: 255}).isString(),
                body('phone').isString().optional(),
                body('city').isString().optional(),
                body('country').isString().optional(),
                body('street').isString().optional(),
                body('apartment').isString().optional(),
                body('zip').matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "i").optional()
            ];
            break;
        case 'signin':
            rules.push(body('email', 'Invalid email').exists().isEmail());
            break;

        case 'adminSignin':
            rules.push(body('email', 'Invalid email').exists().isEmail());
            break;

        case 'changePassword':
            rules.push(body('password', "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ")
                .isLength({min: 8}).exists());
            rules.push(body('newPassword', "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ")
                .isLength({min: 8}).exists()
                .matches(/^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,));
            rules.push(body('newPasswordConfirm', "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ")
                .isLength({min: 8}).exists()
                .matches(/^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,));
            break;
    }

    return rules;
}