const router = require("express").Router();

const pool = require("../../db/connection").pool(
  process.env.USER,
    process.env.HOST,
    process.env.USER,
    process.env.PASSPORT,
  process.env.PGQLPORT
);

router.get("/res", (req, res, next) => {
  pool.query("select * from person", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

module.exports = router;
