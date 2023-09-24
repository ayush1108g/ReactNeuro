const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const studentsignuprouter = require("./routes/loginroutes");
const mentorignuprouter = require("./routes/mentorloginroute");
const resourcesrouter = require("./routes/resourcesroute");
const feedbackrouter = require("./routes/feedbackroute");
const fileroute = require("./routes/fileroute");
let cookieParser = require("cookie-parser");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  next(); // Pass control to the next middleware or route handler
});

app.use((req, res, next) => {
  console.log("Hello");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/student", studentsignuprouter);
app.use("/mentor", mentorignuprouter);
app.use("/data", resourcesrouter);
app.use("/feedback", feedbackrouter);
app.use("/data",fileroute);
module.exports = app;
