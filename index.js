require('dotenv').config();
const express = require("express");

const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8888;

const staticPath = path.normalize(__dirname + "/public");
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const liquibase = require("./liquibaseSettings/index")
  .liquibase(process.env.URL,process.env.USER,process.env.PASSWORD)
  .run()
  .then(() => console.log("success"))
  .catch(err => console.log("fail", err));

const routes = require("./routes/api/routes")(app);

app.listen(port, function() {
  console.log(`Server is listening on ${port}`);
});
