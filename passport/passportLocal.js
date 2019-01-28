let passport = require("passport");
let LocalStrategy = require("passport-local");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt-nodejs");
const pool = require("../db/connection").pool(
  process.env.USER,
  process.env.HOST,
  process.env.DB,
  process.env.PASSWORD,
  process.env.PGQLPORT
);

passport.use(
  "signIn",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    (req, email, password, done) => {
      pool.query(`select * from Person where email=$1`, [email], (err, res) => {
        if (err) {
          if (err) {
            req.flash("message", "Server Error");
            return done(err);
          }
        }
        if (res.rows[0]) {
          if (bcrypt.compareSync(password, res.rows[0].hash)) {
            return done(null, res.rows[0]);
          } else {
            req.flash("message", "Email or password are incorrect.");
            return done(null, false);
          }
        } else {
          req.flash("message", "Email or password are incorrect.");
          return done(null, false);
        }
      });
    }
  )
);

passport.use(
  "signUp",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true, session: true },
    (req, email, password, done) => {
      if (
        email &&
        password &&
        req.body.firstname &&
        req.body.lastname &&
        req.body.is_admin
      ) {
        pool.query(
          `select * from Person where email=$1`,
          [email],
          (err, res) => {
            if (err) {
              req.flash("message", "Server Error");
              return done(err);
            }
            if (res.rows[0]) {
              req.flash("message", "User not exist");
              return done(null, err);
            } else {
              pool.query(
                `insert into Person (firstname,lastname,email,hash,is_admin) values ($1, $2, $3, $4, $5)`,
                [
                  req.body.firstname,
                  req.body.lastname,
                  req.body.email,
                  bcrypt.hashSync(req.body.password),
                  req.body.is_admin
                ],
                (error, res) => {
                  if (error) {
                    req.flash("message", "User not exist");
                    return done(error);
                  }
                  return done(null, { message: "done" });
                }
              );
            }
          }
        );
      } else {
        req.flash(
          "message",
          "Email, password, firstname, lastname, is_admin are required."
        );
        return done();
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

function generateJWT(user) {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign(
    { ...user, exp: parseInt(expiry.getTime() / 1000) },
    process.env.SECRET
  );
}

const checkAuthentication = isAdmin => (req, res, next) => {
  let token = req.headers.token;
  if (token) {
    pool.query(
      `select * from Person_Token where token=$1`,
      [token],
      (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Server Error" });
        }
        if (result.rows[0]) {
          jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
              return res
                .status(401)
                .json({ message: "You are not authorized" });
            } else {
              if (isAdmin) {
                if (decoded.isAdmin) {
                  req.decoded = decoded;
                  next();
                } else {
                  return res.status(401).json({ message: "access deny" });
                }
              } else {
                req.decoded = decoded;
                next();
              }
            }
          });
        } else {
          return res.status(401).json({ message: "You are not authorized" });
        }
      }
    );
  } else {
    return res.status(401).json({ message: "You are not authorized" });
  }
};

module.exports = passport;
module.exports.generateJWT = generateJWT;
module.exports.checkAuthentication = checkAuthentication;
