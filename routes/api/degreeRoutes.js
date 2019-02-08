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

module.exports = router;
