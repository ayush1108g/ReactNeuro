const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const studentsignuprouter = require("./routes/loginroutes");
const mentorignuprouter = require("./routes/mentorloginroute");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip;
  // const body = JSON.parse(req.body);

  console.log(`[${timestamp}] ${method} ${url}`);
  console.log(`[${timestamp}] ${ip}`);
  // console.log(`[${timestamp}] ${body}`);
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
app.use("/data", studentsignuprouter);
app.use("/neuro/login/signup/mentor", mentorignuprouter);

module.exports = app;
