const auth = require("./authRoutes");
const test = require("./test");
const degreeRoutes = require("./degreeRoutes");

const personsRoutes = require("./personsRoutes");
const questPersonsRoutes = require("./questionPersonAnswersRoutes");
const survQuestionRoutes = require("./surveyQuestionsRoutes");
const surveysRoutes = require("./surveysRoutes");

module.exports = app => {
  app.use("/api/", auth);
  app.use("/api/", degreeRoutes);
  app.use("/api/", personsRoutes);
  app.use("/api/", questPersonsRoutes);
  app.use("/api/", survQuestionRoutes);
  app.use("/api/", surveysRoutes);
  app.use("/api/", test);
};
