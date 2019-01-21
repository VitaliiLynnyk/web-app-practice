let passport = require("passport");
let LocalStrategy = require("passport-local");
let jwt = require('jsonwebtoken');
let bcrypt = require("bcrypt-nodejs");
const pool = require("../db/connection").pool(
    process.env.USER,
    process.env.HOST,
    process.env.DB,
    process.env.PASSWORD,
    process.env.PGQLPORT
);

passport.use('signIn',new LocalStrategy({usernameField: 'email', passReqToCallback: true,session:false},function(req,email, password, done) {
    pool.query(
                `select * from Person where email=$1`,[email],
                (err, res) => {
                    if (err) {
                        if (err) { return done(err); }
                    }
                    if(res.rows[0] === null){
                        req.flash("danger", "Oops. Email isnt exist");
                        return done(null, false);
                    }else {
                        if(bcrypt.compareSync(password,res.rows[0].hash)){
                            return done(null, res.rows[0]);
                        }else {
                            req.flash("danger", "Oops. Incorrect login details.");
                            return done(null, false);
                        }
                    }
                })}));

passport.use('signUp',new LocalStrategy({usernameField: 'email', passReqToCallback: true,session:false},function(req,email, password, done) {
    if(email && password && req.body.firstname && req.body.lastname){
        pool.query(
            `select * from Person where email=$1`,[email],
            (err, res) => {
                console.log("select form person");
                if (err) {
                        req.flash("danger", err);
                        return done(err);
                }
                if(res.rows[0]){
                    console.log("email exist");
                    req.flash("danger", "This email address is already registered.");
                    return done(null,err);
                }else {
                    pool.query(
                        `insert into Person (firstname,lastname,email,hash) values ($1, $2, $3, $4)`,
                        [req.body.firstname, req.body.lastname, req.body.email,bcrypt.hashSync(req.body.password)],
                        (error, results) => {
                            if (error) {
                                return done(error);
                            }
                            return done(null,results.rows[0]);
                        }
                    );
                }
            })
    }else {
        req.flash("danger", "email, password, firstname, lastname are required.");
        return done();
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

function generateJWT(user) {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({...user,exp:parseInt(expiry.getTime() / 1000)},process.env.SECRET);
};

function checkAuthentication(req,res,next){
    let token = req.headers.token;
    console.log("checkAUTH",req.headers.token);
    if (token) {
        jwt.verify(token,process.env.SECRET, function(err, decoded) {
            if (err) {
                return res.json({ status: 401, error: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.json({status:401,error:'you are not authorized'});
    }
}
module.exports = passport;
module.exports.generateJWT = generateJWT;
module.exports.checkAuthentication = checkAuthentication;