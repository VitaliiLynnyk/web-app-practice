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
                  random_url.replace("$", "");
                  pool.query(
                    `insert into TEMPORARY_SURVEYS (survey_id, random_url, time) values ($1,$2,$3) returning random_url`,
                    [surveysStat.rows[0].id, random_url, null],
                    (err, temporaryData) => {
                      if (err) {
                        return res
                          .status(401)
                          .json({ message: "Server Error" });
                      }

                      res.status(200).json({
                        random_url: temporaryData.rows[0].random_url,
                        survey_id: surveysStat.rows[0].id
                      });
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

module.exports = router;
