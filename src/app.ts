import express from "express";
import morgan from "morgan";

import userRoute from "./routes/user.route";
import bookRoute from "./routes/book.route";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/error.controller";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/book", bookRoute);
app.use("/api/v1/auth", userRoute);

app.get("/api/v1/health-check", (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: {
      msg: "server is running!",
    },
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
