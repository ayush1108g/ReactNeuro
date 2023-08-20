const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./schema/student/signup");
dotenv.config({ path: "./config.env" });
const app = require("./app");

mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
