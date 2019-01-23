const router = require("express").Router();
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

router.post('/signIn', (req, res, next) => {
    passport.authenticate('signIn',{failureFlash:true}, (err, user) => {
        if (!user || err ) {
            return res.status(401).json({message:req.flash("message")[0]});
        }else{
            let token = localStrategy.generateJWT(user);
            req.headers.token = token;
            req.login(user, (err) => {
                if(err) {
                    return res.status(401).json({message:"Server Error"});
                }
                pool.query(`insert into Person_Token (person_id, token) values ($1, $2)`,[user.id, token], (error, results) => {
                    if (error) {
                        return res.status(401).json({message:"Server Error"});
                    }
                    if(results.rows){
                        res.status(200).json({token: token});
                    }else{
                        res.status(401).json({message:"Server Error"});
                    }
                });
            });
        }
    })(req, res, next);
});

router.post('/signUp', (req, res, next) => {
    passport.authenticate('signUp',{failureFlash:true}, (err, stat) => {
        if (!stat || err) {
            return res.status(401).json({message:req.flash("message")[0]});
        }else{
            res.status(200).json({message: "done"});
        }
    })(req, res, next);
});

router.get("/logOut",checkAuthentication(false),(req, res, next) => {
        pool.query(`delete from Person_Token where token=$1`,[req.headers.token], (error, results) => {
            if (error) {
                return res.status(401).json({message: "Server Error"});
            }
            let user = req.decoded;
            req.logout();
            res.status(200).json({message:`${user.firstname} is logOut`});
        });
});

router.get("/res", (req, res, next) => {
       pool.query(`select * from  Person_Token`, (error, results) => {
           if (error) {
               return res.status(401).json({message: "Server Error"});
           }
           res.status(200).json({message:results.rows});
       });
});

router.get("/allTestsResultsList",checkAuthentication(false), (req, res, next) => {
    pool.query(`select * from  Person_Question_Answers`, (err, result) => {
        if (err) {
            return res.status(401).json({message: "Server Error"});
        }
        res.status(200).json({message:result.rows});
    });
});

router.get("/testsResultsList",checkAuthentication(false), (req, res, next) => {
    pool.query(`select * from  Person_Question_Answers where person_id=(select id from Person where firstname='${req.query.firstname}') and survey_id=1`, (err, result) => {
        if (err) {
            return res.status(401).json({message: "Server Error"});
        }
        res.status(200).json({message:result.rows});
    });
});

module.exports = router;
