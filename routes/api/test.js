const router = require("express").Router();
let bcrypt = require("bcrypt-nodejs");
let jwt = require('jsonwebtoken');
let checkAuthentication = require('../../passport/passportLocal').checkAuthentication;

const pool = require("../../db/connection").pool(
  process.env.USER,
  process.env.HOST,
  process.env.DB,
  process.env.PASSWORD,
  process.env.PGQLPORT
);
let localStrategy = require('../../passport/passportLocal');
let passport = require('passport');

router.post('/signIn', function(req, res, next) {
    passport.authenticate('signIn',{failureFlash:true}, function(err, user) {
        if (!user) {
            return res.status(401).json(req.flash('danger'));
        }else{
            let token = localStrategy.generateJWT(user);
            req.headers.token = token;

            pool.query(`insert into Person_Token (person_id, token) values ($1, $2)`,[user.id, token], (error, results) => {
                console.log(user.id, token);
                if (error) {
                    return res.status(401).json(error);
                }
                res.status(200).json(results);
            });
        }
    })(req, res, next);
});

router.post('/signUp', function(req, res, next) {
    passport.authenticate('signUp',{failureFlash:true}, function(err, user) {
        if (!user || err) {
            return res.status(401).json(req.flash('danger'));
        }else{
            res.send(user);
        }
    })(req, res, next);
});

router.get("/logOut",checkAuthentication,(req, res, next) => {
    pool.query(`delete from Person_Token where token=$1`,[req.headers.token], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json({"ok":"log out"});
    });
});

router.get("/res", (req, res, next) => {
       pool.query(`select * from  Person_Token`, (error, results) => {
           if (error) {
               throw error;
           }
           res.status(200).json(results.rows);
       });
});

module.exports = router;
