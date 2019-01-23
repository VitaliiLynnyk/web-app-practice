const router = require("express").Router();
let checkAuthentication = require('../../passport/passportLocal').checkAuthentication;

const pool = require("../../db/connection").pool(
  process.env.USER,
  process.env.HOST,
  process.env.DB,
  process.env.PASSWORD,
  process.env.PGQLPORT
);

router.get("/test",(req, res, next) => {
    pool.query(`select * from Person`, (error, results) => {
        if (error) {
            return res.status(401).json({message: "Server Error"});
        }
        res.status(200).json({message: results.rows});
    });
});


module.exports = router;
