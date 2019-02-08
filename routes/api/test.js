const router = require("express").Router();
let checkAuthentication = require("../../passport/passportLocal")
  .checkAuthentication;

const pool = require("../../db/connection").pool(
  process.env.USER,
  process.env.HOST,
  process.env.DB,
  process.env.PASSWORD,
  process.env.PGQLPORT
);

router.get("/personsTokens", (req, res, next) => {
    pool.query(`select * from  Person_Token`, (err, data) => {
        if (err) {
            return res.status(401).json({ message: "Server Error" });
        } else if (!data.rows.length) {
            return res.status(404).json({ message: "Persons Tokens list is Empty" });
        }
        res.status(200).send(data.rows);
    });
});

router.get("/temp", (req, res, next) => {
    pool.query(`select * from survey_questions`, (err, data) => {
        res.status(200).json({ data: data.rows });
    });
});

module.exports = router;
