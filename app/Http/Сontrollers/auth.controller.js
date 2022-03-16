const config = require("../../../config/index.config");
const {auth} = require("../../Services/hub.services");
const {mailerServices} = require("../../Services/mailer.services");
const db = require("../../Models/index");
const User = db.User;
const Company = db.Company;
const MultiFactor = db.MultiFactor;
const CompanyInvite = db.CompanyInvite;
const jwt = require('jsonwebtoken');
const passport = require("passport");
const bcrypt = require('bcryptjs');
let error = true;

class AuthController {

    signup = async (req, res) => {
        try {
            const body = req.body;

            const userCheck = await User.findOne({where: {email: body.email}});
            if (userCheck) throw new Error('E-mail already in use');

            if (req.query.invite) {
                const invite = await CompanyInvite.findOne({where: {invite: req.query.invite}});
                if (!invite || invite.email !== body.email)
                    return res.status(404).json('Sorry, invite not found');

                body.companyId = invite.companyId;
                await CompanyInvite.destroy({where: {invite: req.query.invite}});
            }

            body.password = bcrypt.hashSync(body.password, 8);
            const user = await User.create(body);

            if (body.company)
                await Company.create({name: body.company.name, ownerId: user.id});

            mailerServices.sender(body.email, null, "Sign up", "signUp");

            return res.status(201).end();
        } catch (e) {
            return res.status(400).json({code: e.code || 0, message: e.message || "Error"});
        }
    };

    signin = async (req, res, next) => {
        passport.authenticate('login', async (err, user) => {
            try {
                if (!user) return next({message: "Wrong password or email"});
                else if (err) return next(err);
                req.login(
                    user, {session: false},
                    async (error) => {
                        let valid = true;
                        if (error) return next(error);
                        const factor = await MultiFactor.findOne({where: {'userId': user.id}});
                        if (factor) {
                            valid = !(factor.emailFactor || factor.yubicoFactor);
                        }
                        const token = await auth.token(user, valid);
                        return res.json({
                            token,
                            user,
                            emailFactor: factor?.emailFactor || null,
                            yubicoFactor: factor?.yubicoFactor || null
                        });
                    }
                );
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    };

    adminSignin = async (req, res, next) => {
        const {email} = req.body;
        const adminCheck = await User.findOne({where: {email}});
        if(!adminCheck || adminCheck.role !== 'Owner') {
            return next({message: "Wrong password or email"});
        }
        passport.authenticate('login', async (err, user) => {
            try {
                if (!user) return next({message: "Wrong password or email"});
                else if (err) return next(err);
                req.login(
                    user, {session: false},
                    async (error) => {
                        let valid = true;
                        if (error) return next(error);
                        const factor = await MultiFactor.findOne({where: {'userId': user.id}});
                        if (factor) {
                            valid = !(factor.emailFactor || factor.yubicoFactor);
                        }
                        const token = await auth.token(user, valid);
                        return res.json({
                            token,
                            user,
                            emailFactor: factor?.emailFactor || null,
                            yubicoFactor: factor?.yubicoFactor || null
                        });
                    }
                );
            } catch (error) {
                return next(error);
            }
        })(req, res, next);
    };

    resetPassword = async (req, res) => {
        try {
            if (!req.body.email) return res.status(422).send({message: 'E-mail is missing'});
            const email = req.body.email;
            let user = await User.findOne({where: {email: email}});
            if (!user) res.status(404).json({errors: 'User not found'});
            await MultiFactor.update({emailFactor: false, yubicoFactor: false}, {where: {userId: user.id}});
            const token = await auth.token(user, true);
            const link = `${config.frontend.appUrl}/${req.body.redirectUrl}?token=${token}`
            const supportLink = `${config.frontend.appUrl}/support`
            mailerServices.sender(email, {link,supportLink}, "Password recovery", "resetPassword");
            res.json({status: true});
        } catch (e) {
            return res.status(500).json({code: e.code || 0, message: e.message || "Error"});
        }

    };

    setPassword = (req, res) => {
        try {
            if (req.body.password !== req.body.passwordConfirm) throw new Error("Password not confirmation");
            jwt.verify(req.body.token, config.auth.secret, (err, decoded) => {
                if (err) return res.status(401).send({message: "No data available"});
                User.update({password: bcrypt.hashSync(req.body.password, 8)}, {where: {id: decoded.user.id}})
                    .then(() => res.send({message: "Password updated successfully"}))
                    .catch(err => res.status(500).send({message: err.message}));
            });
        } catch (e) {
            return res.status(500).json({code: e.code || 0, message: e.message || "Error"});
        }
    };

    changePassword = async (req, res) => {
        try {
            let {user} = req;
            const body = req.body;
            const userId = (user.role === 'Owner') ? (req.body.userId || user.id) : user.id;
            user = await User.findByPk(userId);
            if (!user) throw new Error('User not found');
            if (body.newPassword !== body.newPasswordConfirm) throw new Error("Password doesn't match");
            const passwordIsValid = bcrypt.compareSync(body.password, user.password);
            if (!passwordIsValid) throw new Error('Invalid Password');
            const result = await User.update({password: bcrypt.hashSync(body.newPassword, 8)}, {where: {id: userId}});
            return result == 1 ?
                res.json({payload: {message: "Password was updated successfully"}}) :
                res.status(404).json({payload: {message: `Cannot update User with id = ${userId}. Maybe Password was not found or req.body is empty`}});
        } catch (e) {
            return res.status(500).json({code: e.code || 0, message: e.message || "Error"});
        }
    };

    sendEmailFactor = async (req, res) => {
        const token = Math.random().toString(36).slice(6);
        MultiFactor
            .findOne({where: {'userId': req.user.id}})
            .then(function (obj) {
                if (obj) {
                    return obj.update({
                        'emailKey': token,
                        'emailDate': new Date()
                    });
                }
                return MultiFactor.create({
                    'emailKey': token,
                    'emailDate': new Date(),
                    'userId': req.user.id,
                });
            })
        mailerServices.sender(req.user.email, token, "Go Talk Verification Code", "2fa");
        res.json({status: true});
    };

    switchMultiFactor = async (req, res) => {
        error = true;
        if (req.body.emailFactor) {
            if (await auth.checkEmailFactor(req.user, req.body.emailFactor)) {
                error = false
                MultiFactor.update({emailFactor: req.body.type}, {where: {userId: req.user.id}});

            }
        }
        if (req.body.yubicoFactor) {
            if (await auth.checkYubicoFactor(req.user, req.body.yubicoFactor)) {
                error = false
                await MultiFactor.update({yubicoFactor: req.body.type,}, {where: {userId: req.user.id}});
            }
            if (req.body.clientId && req.body.secretKey) {
                if (await auth.checkYubicoNewFactor(req.body.yubicoFactor, req.body.clientId, req.body.secretKey)) {
                    error = false
                    await MultiFactor
                        .findOne({where: {'userId': req.user.id}})
                        .then(function (obj) {
                            if (obj) {
                                return obj.update({
                                    yubicoFactor: req.body.type,
                                    clientID: req.body.clientId,
                                    secretKey: req.body.secretKey
                                });
                            }
                            return MultiFactor.create({
                                yubicoFactor: req.body.type,
                                clientID: req.body.clientId,
                                secretKey: req.body.secretKey,
                                userId: req.user.id,
                            });
                        })
                }
            }

        }
        (error) ? res.status(500).send({message: "Server error"}) : res.send({message: "Factor updated successfully"})
    };

    verificationMultiFactor = async (req, res) => {
        error = true;
        const user = req.user;
        await MultiFactor.findOne({where: {'userId': req.user.id}})
            .then(async function (obj) {
                    if (obj) {
                        if (obj.emailFactor) {
                            if (!req.body.emailFactor) {
                                return res.status(403).json({message: 'Please write email Factor'});
                            }
                            if (await auth.checkEmailFactor(user, req.body.emailFactor)) {
                                error = false;
                            }
                        }
                        if (obj.yubicoFactor) {
                            error = true;
                            if (!req.body.yubicoFactor) {
                                return res.status(403).json({message: 'Please write yubico Factor'});
                            }
                            if (await auth.checkYubicoFactor(user, req.body.yubicoFactor)) {
                                error = false;
                            }
                        }
                    }
                }
            );
        if (error) {
            res.status(403).send({message: 'Unauthorized'});
        }
        const token = await auth.token(user, true);
        return res.json({token, user});
    };
}

module
    .exports = {
    AuthController
};



