const generatePassword = require("password-generator");
const bcrypt = require('bcryptjs');
const db = require("../Models/index");
const {mailerServices} = require("./mailer.services");
const User = db.User;

class UserServices {

    create = async (data) => {
        const passwd = data.password ?? generatePassword(12, false);
        data.password = bcrypt.hashSync(passwd, 8);
        return await User.create(data);
    };

    getUser = async (data,user) => {
        if (user) return await User.findByPk(user.id);
        else {
            user = await User.findOne({where: {email: data.email}});
            if (user){
                const passwordIsValid = bcrypt.compareSync(data.password,user.password);
                if (!passwordIsValid) throw new Error('Invalid Password!');
                return user;
            }else {
                mailerServices.sender(data.email, null, "Sign up", "signUp");
                return this.create(data);
            }
        }
    };

}

module.exports = {
    UserServices,
    userServices: new UserServices()
};