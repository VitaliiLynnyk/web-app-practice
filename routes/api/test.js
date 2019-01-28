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
  let array = [
    {
      firstname: "test",
      lastname: "test",
      is_admin: false,
      email: "test@test.com",
      hash: "dsaddas"
    },
    {
      firstname: "test",
      lastname: "test",
      is_admin: false,
      email: "test@test.com",
      hash: "dsaddas"
    },
    {
      firstname: "test",
      lastname: "test",
      is_admin: false,
      email: "test@test.com",
      hash: "dsaddas"
    }
  ];
  array.forEach(e => {
    pool.query(
      `insert into Person (firstname, lastname, is_admin, email, hash) values ($1, $2, $3, $4, $5)`,
      [e.firstname, e.lastname, e.is_admin, e.email, e.hash],
      (error, results) => {
        if (error) {
          return res.status(401).json({ message: "Server Error" });
        }
      }
    );
  });

  res.status(200).json({ message: "ok" });
});

module.exports = router;
