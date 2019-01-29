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

router.get("/personsList", checkAuthentication(false), (req, res, next) => {
  pool.query(`select * from  Person`, (error, results) => {
    if (error) {
      return res.status(401).json({ message: "Server Error" });
    }
    res.status(200).json({ message: results.rows });
  });
});

router.post("/authentication", (req, res, next) => {
  if (req.headers.token) {
    pool.query(
      `select * from Person_Token where token=$1`,
      [req.headers.token],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Server Error" });
        }
        if (result.rows[0]) {
          return res.status(200).json({ message: "" });
        } else {
          return res.status(401).json({ message: "" });
        }
      }
    );
  } else {
    return res.status(401).json({ message: false });
  }
});

router.get("/surveys", checkAuthentication(false), (req, res, next) => {
  pool.query(
    `select Survey.id as survey_id, Survey.description, Person.firstname, Person.lastname from Person
     inner join Survey on Person.id = Survey.person_id`,
    (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Server Error" });
      }
      res.status(200).json({ message: result.rows });
    }
  );
});

router.post("/surveys", checkAuthentication(false), (req, res, next) => {
  if (req.body.description && req.body.person_id) {
    pool.query(
      `insert into Survey (description,person_id) values ($1, $2)`,
      [req.body.description, req.body.person_id],
      (err, statSurveys) => {
        if (err) {
          return res.status(401).json({ message: "Server Error" });
        }
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
    if (req.query.survey_id) {
      pool.query(
        `
     select question_answers.id, question.question, question_answers.answer
        from survey_questions
            inner join question on survey_questions.question_id = question.id
            inner join question_answers on question.id = question_answers.question_id
            where survey_questions.survey_id=$1
     `,
        [req.query.survey_id],
        (err, result) => {
          if (err) {
            return res.status(401).json({ message: "Server Error" });
          }
          const formatedQuestionAnswersArray = result.rows.reduce(
            (acc, current) => {
              const answers = acc[current.question] || [];
              return {
                ...acc,
                [current.question]: [
                  ...answers,
                  { id: current.id, answer: current.answer }
                ]
              };
            },
            {}
          );
          let resArray = [];
          for (let question in formatedQuestionAnswersArray) {
            resArray.push({
              question: question,
              answers: formatedQuestionAnswersArray[question]
            });
          }
          console.log(resArray);
          res.status(200).json({ message: resArray });
        }
      );
    } else {
      return res.status(401).json({ message: "Server Error" });
    }
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
          res.status(200).json({ message: "Done" });
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
    if (req.query.survey_id) {
      pool.query(
        `select
      question.question,question_answers.is_right,
        case 
            when  
                question_answers.answer is null
            then
              question_person_answers.full_answer
            else
            question_answers.answer
            end
            from question_person_answers 
            inner join question_answers on question_answers.id = question_person_answers.question_answers_id
            inner join question on question_answers.question_id = question.id 
        where question_person_answers.survey_id=$1`,
        [req.query.survey_id],
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

router.post(
  "/questionPersonAnswers",
  checkAuthentication(false),
  (req, res, next) => {
    if (req.body.survey_id && req.body.question_answers_id) {
      pool.query(
        `insert into question_person_answers (survey_id, question_answers_id,full_answer) values ($1,$2,$3)`,
        [
          req.body.survey_id,
          req.body.question_answers_id,
          req.body.full_answer
        ],
        (err, result) => {
          if (err) {
            return res.status(401).json({ message: "Server Error" });
          }
          res.status(200).json({ message: "Done" });
        }
      );
    } else {
      return res.status(401).json({ message: "Server Error" });
    }
  }
);

module.exports = router;
