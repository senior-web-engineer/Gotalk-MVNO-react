const config = require("../../config/index.config");
const db = require("../Models/index");
const Company = db.Company;
const jwt = require('jsonwebtoken');
const MultiFactor = db.MultiFactor;
const yub = require('yub');
const now = new Date();

class AuthServices {

    async token(user, validation = true, lifeToken = config.auth.tokenLife) {
        const company = await Company.findOne({where: {ownerId: user.id}});
        const body = {
            id: user.id,
            email: user.email,
            role: user.role,
            MFAType: user.MFAType,
            company_id: (company) ? company.id : null,
            validation: validation
        };
        return jwt.sign({user: body}, config.auth.secret, {expiresIn: lifeToken});
    };

    async checkEmailFactor(user, key) {
        return MultiFactor.findOne({where: {'userId': user.id}})
            .then(function (obj) {
                if (obj) {
                    let updateTime = new Date(obj.emailDate);
                    updateTime.setDate(updateTime.getDate() + 1);
                    return (obj.emailKey === key && updateTime > now);
                }
                return false
            })
    }

    async checkYubicoFactor(user, key) {
        return MultiFactor.findOne({where: {'userId': user.id}})
            .then(function (obj) {
                if (obj) {
                    if (obj.clientID != null && obj.secretKey != null) {
                        yub.init(obj.clientID, obj.secretKey);
                        return new Promise((resolve) =>
                            yub.verify(key, function (err, data) {
                                resolve(data.status === "OK");
                            })
                        )
                    }
                }
                return false
            });
    }

    async checkYubicoNewFactor(key, clientId, secret) {
        yub.init(clientId, secret);
        return await new Promise((resolve) =>
            yub.verify(key, function (err, data) {
                resolve(data.status === "OK");
            })
        )
    }
}

module.exports = {
    AuthServices
};