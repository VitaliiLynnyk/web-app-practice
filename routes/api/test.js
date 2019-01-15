const router = require("express").Router();

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1111',
  port: 5432
})

pool.on('connect', () => {
  console.log('connected to the db');
});

router.get("/res", (req, res, next) => {
	pool.query('SELECT * FROM user', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});

module.exports = router;