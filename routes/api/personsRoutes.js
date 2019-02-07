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

router.get("/personsList", checkAuthentication(true), (req, res, next) => {
    pool.query(
        `select id,firstname,lastname,email from  Person where is_admin=false`,
        (err, data) => {
            if (err) {
                return res.status(401).json({ message: "Server Error" });
            } else if (!data.rows.length) {
                return res.status(404).json({ message: "Persons list is Empty" });
            }
            let formatedData = data.rows.map(e => ({
                id: e.id,
                name: `${e.firstname} ${e.lastname}`,
                email: e.email
            }));
            res.status(200).send(formatedData);
        }
    );
});


module.exports = router;