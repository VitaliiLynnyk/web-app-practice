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

router.get("/test", (req, res, next) => {

    pool.query(
        `insert into question_person_answers (survey_id, question_answers_id,full_answer) values ('1','13',null)`,(err, statQuestion)=>{
            if (err) {
                return res.status(401).json({ message: "Server Error" });
            }
            res.status(200).json({ message: statQuestion.rows });
        });
});

module.exports = router;
