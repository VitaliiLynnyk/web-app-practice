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

router.get("/getDegrees", checkAuthentication(true), (req, res, next) => {
  pool.query(`select * from DEGREE`, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Server Error" });
    } else if (!data.rows.length) {
      return res.status(404).json({ message: "Persons list is Empty" });
    }
    res.status(200).send(data.rows);
  });
});

router.get("/personsList", checkAuthentication(true), (req, res, next) => {
  pool.query(
    `select id,firstname,lastname,email from  Person where is_admin=false`,
    (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Server Error" });
      } else if (!data.rows.length) {
        return res.status(404).json({ message: "Persons list is Empty" });
      }
      let formatedData = data.rows.map(e=> ({id:e.id, name:`${e.firstname} ${e.lastname}`, email:e.email})) 
      res.status(200).send(formatedData);
    }
  );
});

router.get("/surveys", checkAuthentication(false), (req, res, next) => {
  pool.query(
    `select Survey.id as survey_id, Survey.description, Person.firstname, Person.lastname, status.description as status from Survey
     inner join Person on Survey.person_id = Person.id
     inner join Status on Survey.status_id = Status.id
    `,
    (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Server Error" });
      } else if (!data.rows.length) {
        return res.status(404).json({ message: "surveys list is Empty" });
      }
      res.status(200).send(data.rows);
    }
  );
});

router.post("/surveys", checkAuthentication(false), (req, res, next) => {
  if (req.body.person_id && req.body.degree_id) {
    pool.query(
      "select description from degree where id = $1 ",
      [req.body.degree_id],
      (err, degreeData) => {
        if (err || !degreeData.rows.length) {
          return res.status(401).json({ message: "Server Error" });
        }
        let description = `${req.body.person_id} ${
          degreeData.rows[0].description
        }`;
        pool.query(
          `insert into SURVEY (description,person_id,status_id) values ($1,$2,$3) returning id`,
          [description, req.body.person_id, 1],
          (err, surveysStat) => {
            if (err) {
              return res.status(401).json({ message: "Server Error" });
            }
            pool.query(
              `select * from question where degree_id=$1`,
              [req.body.degree_id],
              (err, questionData) => {
                if (err) {
                  return res.status(401).json({ message: "Server Error" });
                }
                pool.query(`select * from topic`, (err, topicData) => {
                  let randomQuestions = topicData.rows.map(item => {
                    return questionData.rows
                      .filter(
                        el =>
                          el.degree_id === req.body.degree_id &&
                          el.topic_id === item.id
                      )
                      .sort(() => 0.5 - Math.random())
                      .slice(0, 5);
                  });
                  randomQuestions.forEach(questionsArr => {
                    questionsArr.forEach(items => {
                      pool.query(
                        `insert into survey_questions (survey_id, question_id) values ($1, $2)`,
                        [surveysStat.rows[0].id, items.id],
                        (err, res) => {
                          if (err) {
                            return res
                              .status(401)
                              .json({ message: "Server Error" });
                          }
                        }
                      );
                    });
                  });

                  let random_url = bcrypt.hashSync(
                    `${surveysStat.rows[0].id} ${Date.now()}`
                  );
				  random_url.replace("$","");
                  pool.query(
                    `insert into TEMPORARY_SURVEYS (survey_id, random_url, time) values ($1,$2,$3) returning random_url`,
                    [req.body.person_id, random_url, null],
                    (err, temporaryData) => {
                      if (err) {
                        return res
                          .status(401)
                          .json({ message: "Server Error" });
                      }
                      res.status(200).json({random_url:temporaryData.rows[0].random_url,survey_id: surveysStat.rows[0].id });
                    }
                  );
                });
              }
            );
          }
        );
      }
    );
  } else {
    return res.status(401).json({ message: "Server Error" });
  }
});

router.get("/surveyQuestions", (req, res, next) => {
  if (req.query.random_url) {
    pool.query(
      `select * from TEMPORARY_SURVEYS where random_url=$1`,
      [req.query.random_url],
      (err, tempData) => {
        if (err || !tempData.rows.length) {
          return res.status(401).json({ message: "Server Error" });
        }

        pool.query(
          `select * from Survey where id=$1`,
          [tempData.rows[0].survey_id],
          (err, surveyData) => {
            if (err || !surveyData.rows.length) {
              return res.status(401).json({ message: "Server Error" });
            } else if (surveyData.rows[0].status_id == 3) {
              return res.status(401).json({ message: "Survey is complited" });
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
                    [surveyData.rows[0].status_id],
                    (err, data) => {
                      if (err) {
                        return res
                          .status(401)
                          .json({ message: "Server Error" });
                      }
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
                [surveyData.rows[0].status_id],
                (err, data) => {
                  if (err) {
                    return res.status(401).json({ message: "Server Error" });
                  }
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
        (err, data) => {
          if (err) {
            return res.status(401).json({ message: "Server Error" });
          } else if (!data.rows.length) {
            return res
              .status(404)
              .json({ message: "Persons Questions list is Empty" });
          }

          const formatedQuestionAnswersArray = data.rows.reduce(
            (acc, current) => {
              const answers = acc[current.question] || [];
              return {
                ...acc,
                [current.question]: [
                  ...answers,
                  { answer: current.answer, is_right: current.is_right }
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
