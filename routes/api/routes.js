const test = require("./test");

module.exports = function(app) {
  app.use("/api/", test);
};