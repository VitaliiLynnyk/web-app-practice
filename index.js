let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let passport = require('passport');
require('dotenv').config();


var session = require('express-session');
let cors = require('cors');

let flash = require("connect-flash");
const port = process.env.PORT || 8888;
app.use(cors({credentials: true, origin: 'https://affectionate-jackson-57aab8.netlify.com'}));

app.use(flash());

app.use(require('cookie-parser')());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));

const liquibase = require("./liquibaseSettings/index")
  .liquibase(process.env.URL,process.env.USER,process.env.PASSWORD)
  .run()
  .then(() => console.log("success"))
  .catch(err => console.log("fail", err));

const routes = require("./routes/api/routes")(app);

app.listen(port, function() {
  console.log(`Server is listening on ${port}`);
});
