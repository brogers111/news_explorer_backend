require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
// const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const limiter = require("./utils/limiterConfig");

const app = express();
const { PORT = 3000 } = process.env;

// mongoose
//   .connect("mongodb://127.0.0.1:27017/news_db")
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch(console.error);

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.use("/", mainRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
