require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const limiter = require("./utils/limiterConfig");
const config = require("./utils/config");

const app = express();

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.use("/", mainRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
