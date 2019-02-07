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

router.post("/questionPersonAnswers", (req, res, next) => {
    if (req.body.answers && Array.isArray(req.body.answers)) {
        pool.query(
            `delete from TEMPORARY_SURVEYS where survey_id=$1 `,
            [req.body.answers[0].surv_id],
            (err, res) => {
                if (err) {
                    return res.status(401).json({ message: "Server Error" });
                }
                pool.query(
                    `select * from Survey where id=$1`,
                    [req.body.answers[0].surv_id],
                    (err, data) => {
                        if (err || data.rows[0].status_id == 3) {
                            return res.status(401).json({ message: "Server Error" });
                        }
                        req.body.answers.forEach(e => {
                            pool.query(
                                `insert into question_person_answers (survey_id, question_answers_id,full_answer) values ($1,$2,$3)`,
                                [e.surv_id, e.answer_id, e.full_answer],
                                (err, result) => {
                                    if (err) {
                                        return res.status(401).json({ message: "Server Error" });
                                    }
                                }
                            );
                        });
                        pool.query(
                            `update Survey set status_id=$1 where id=$2 returning id`,
                            [3, req.body.answers[0].surv_id],
                            (err, result) => {
                                if (err) {
                                    return res.status(401).json({ message: "Server Error" });
                                }
                                if (result.rows.length) {
                                    return res.status(200).json({ message: "Done" });
                                } else {
                                    return res.status(401).json({ message: "Server Error" });
                                }
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