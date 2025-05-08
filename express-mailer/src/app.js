import createError from "http-errors";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { config } from "dotenv";

import indexRouter from "./routes/index.js";
import mailerConsumer from "./rabbitMQ/mailer/consumer.js";

const app = express();
const loggerFormat = `[:date[web]] => :method ":url" :status => :response-time ms [:user-agent]`;

config();

await mailerConsumer();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
