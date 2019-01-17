const liquibase = require("../module/liquibase");

exports.liquibase = (url, username, password) =>
  liquibase({
    url: url,
    username: username,
    password:  password
  });
