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

let generate = require('../../passport/passportLocal');

router.post('/signIn', function(req, res, next) {
    passport.authenticate('signIn',{failureFlash:true}, function(err, user) {
        if (!user) {
            return res.status(401).json(req.flash('danger'));
        }else{
            let token = generate.generateJWT(user);
            req.headers.token = token;
            res.send(token);
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

router.get("/res", (req, res, next) => {

       pool.query(`select * from person`, (error, results) => {
           if (error) {
               throw error;
           }
           res.status(200).json(results.rows);
       });

});

module.exports = router;
