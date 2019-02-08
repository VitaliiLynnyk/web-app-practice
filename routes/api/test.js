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

router.get("/statistics", (req, res, next) => {
    pool.query(`
     select count(*) as allPersons from Person where is_admin=false;
     select count(*) as allSurveys from SURVEY;
     select count(SURVEY.id),STATUS.description from STATUS
     inner join SURVEY on SURVEY.status_id=status.id
     group by STATUS.description`, (err, data) => {
        res.status(200).json({ allPersons: data[0].rows,allSurveys: data[1].rows,surveysByStatus: data[2].rows });
    });
});

module.exports = router;
