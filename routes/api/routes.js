const auth = require("./authRoutes");
const db = require("./dbRouts");
const test = require("./test");

module.exports = app => {
  app.use("/api/", auth);
  app.use("/api/", db);
  app.use("/api/", test);
};
