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
        `select * from Question`,(err, statQuestion)=>{
            if (err) {
                return res.status(401).json({ message: "Server Error" });
            }

            let questionsCopyArray = [...statQuestion.rows];
            let randomQuestionArray = [];
            let length = 4;
            for(let i = 0 ; i < length; i++){
                let randomIndex = Math.floor(Math.random() * questionsCopyArray.length);

                randomQuestionArray.push(questionsCopyArray[randomIndex]);
                questionsCopyArray.splice(randomIndex,1);
            }
            res.status(200).json({ message: randomQuestionArray });
        });
});

module.exports = router;
