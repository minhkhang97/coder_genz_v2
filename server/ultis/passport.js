const {ExtractJwt, Strategy} = require('passport-jwt');


const User = require('../users/users.model');
//
const applyPassport = (passport) => {
    const options = {
        secretOrKey: process.env.SECRET_1,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    }
    passport.use(new Strategy(options, async (payload, done) => {
        //ko hieu lam nhung ma payload bh se la accessToken sau decode
        //console.log(payload);
        try {
            const user = await User.findOne({_id: payload.sub});

            if(!user)
                return done(null, false);

            //bay gio: req.user = user
            return done(null, user);
        }
        catch (err){
            return  done(null, false);
        }
    }));
};

module.exports = applyPassport;