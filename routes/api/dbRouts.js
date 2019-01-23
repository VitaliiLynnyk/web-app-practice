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

router.get("/person_token", (req, res, next) => {
  pool.query(`select * from  Person_Token`, (error, results) => {
    if (error) {
      return res.status(401).json({ message: "Server Error" });
    }
    res.status(200).json({ message: results.rows });
  });
});

router.get("/surveys", checkAuthentication(false), (req, res, next) => {
  pool.query(
    `select Survey.id as survey_id, Survey.description, Person.firstname, Person.lastname from Person inner join Survey on Person.id = Survey.person_id`,
    (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Server Error" });
      }
      res.status(200).json({ message: result.rows });
    }
  );
});

router.post("/surveys", checkAuthentication(false), (req, res, next) => {
  if (req.body.person_id && req.body.description) {
    pool.query(
      `insert into Survey (description,person_id) values ($1, $2)`,
      [req.body.description, req.body.person_id],
      (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Server Error" });
        }
        res.status(200).json({ message: result.rows });
      }
    );
  } else {
    return res.status(401).json({ message: "Server Error" });
  }
});

router.get(
  "/survey_questions",
  checkAuthentication(false),
  (req, res, next) => {
    pool.query(`select * from Survey_Questions`, (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Server Error" });
      }
      res.status(200).json({ message: result.rows });
    });
  }
);

router.post(
  "/survey_questions",
  checkAuthentication(false),
  (req, res, next) => {
    if (req.body.survey_id && req.body.question_id) {
      pool.query(
        `insert into Survey_Questions (survey_id, question_id) values ($1, $2)`,
        [req.body.survey_id, req.body.question_id],
        (err, result) => {
          if (err) {
            return res.status(401).json({ message: "Server Error" });
          }
          res.status(200).json({ message: result.rows });
        }
      );
    } else {
      return res.status(401).json({ message: "Server Error" });
    }
  }
);

router.get(
  "/questionPersonAnswers",
  checkAuthentication(false),
  (req, res, next) => {
    pool.query(`select * from  Question_Person_Answers`, (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Server Error" });
      }
      res.status(200).json({ message: result.rows });
    });
  }
);

router.post(
  "/questionPersonAnswers",
  checkAuthentication(false),
  (req, res, next) => {
    if (req.body.survey_id && req.question_answers_id) {
      pool.query(
        `insert into Question_Person_Answers (survey_id, question_answers_id) values ($1, $2)`,
        [req.body.survey_id, req.question_answers_id],
        (err, result) => {
          if (err) {
            return res.status(401).json({ message: "Server Error" });
          }
          res.status(200).json({ message: "ok" });
        }
      );
    }
  }
);

module.exports = router;
