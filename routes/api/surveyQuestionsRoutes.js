const router = require("express").Router();
let bcrypt = require("bcrypt-nodejs");
let checkAuthentication = require("../../passport/passportLocal")
  .checkAuthentication;

const pool = require("../../db/connection").pool(
  process.env.USER,
  process.env.HOST,
  process.env.DB,
  process.env.PASSWORD,
  process.env.PGQLPORT
);

router.get("/surveyQuestions", (req, res, next) => {
  if (req.query.random_url) {
    pool.query(
      `select * from TEMPORARY_SURVEYS where random_url=$1`,
      [req.query.random_url],
      (err, tempData) => {
        if (err || !tempData.rows.length) {
          return res.status(501).json({ message: "Server Error" });
        }
        pool.query(
          `select * from Survey where id=$1`,
          [tempData.rows[0].survey_id],
          (err, surveyData) => {
            if (err || !surveyData.rows.length) {
              return res.status(501).json({ message: "Server Error" });
            } else if (surveyData.rows[0].status_id == 3) {
              return res.status(501).json({ message: "Survey is complited" });
            }
            if (surveyData.rows[0].status_id == 1) {
              pool.query(
                `update Survey set status_id=$1 where id=$2 returning id`,
                [2, surveyData.rows[0].id],
                (err, updateSurveyData) => {
                  if (err || !updateSurveyData.rows.length) {
                    return res.status(401).json({ message: "Server Error" });
                  }

                  ///// update with time !

                  pool.query(
                    `
                           select question_answers.id, question.question, question_answers.answer
                              from survey_questions
                                  inner join question on survey_questions.question_id = question.id
                                  inner join question_answers on question.id = question_answers.question_id
                                  where survey_questions.survey_id=$1
                           `,
                    [surveyData.rows[0].id],
                    (err, data) => {
                      if (err) {
                        return res
                          .status(401)
                          .json({ message: "Server Error" });
                      }
                      console.log("data", data);
                      const formatedQuestionAnswersArray = data.rows.reduce(
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
                      res.status(200).send(resArray);
                    }
                  );
                }
              );
            } else {
              pool.query(
                `
                           select question_answers.id, question.question, question_answers.answer
                              from survey_questions
                                  inner join question on survey_questions.question_id = question.id
                                  inner join question_answers on question.id = question_answers.question_id
                                  where survey_questions.survey_id=$1
                           `,
                [surveyData.rows[0].id],
                (err, data) => {
                  if (err) {
                    return res.status(401).json({ message: "Server Error" });
                  }
                  console.log("data", data.rows);
                  const formatedQuestionAnswersArray = data.rows.reduce(
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
                  res.status(200).send(resArray);
                }
              );
            }
          }
        );
      }
    );
  } else {
    return res.status(401).json({ message: "Server Error" });
  }
});

module.exports = router;
