const passportMiddleware = require('passport');
const passportJWT = require("passport-jwt");
const config = require("../../../config/auth.config");
const JWTStrategy = passportJWT.Strategy;
const localStrategy = require('passport-local').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const db = require("../../Models/index");
const User = db.User;

passportMiddleware.use('login', new localStrategy({usernameField: 'email', passwordField: 'password'},
    async (email, password, done) => {
        try {
            const user = await User.findOne({where: {email: email}});
            if (!user) return done(null, false, {message: 'User not found'});

            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) return done(null, false, {message: 'Invalid Password!'});

            return done(null, user, {message: 'Logged in Successfully'});
        } catch (error) {
            return done(error);
        }
    }
    )
);

passportMiddleware.use(new JWTStrategy({secretOrKey: config.secret, jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken()},
    async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    })
);