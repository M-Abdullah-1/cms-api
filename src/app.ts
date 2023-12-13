import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRoute from "./routes/auth.route";
import AppError from "./utils/appError.util";
import globalErrorHandler from "./controllers/error.controller";
import blogRoute from "./routes/blog.route";
import userRoute from "./routes/user.route";

const app = express();

/**
 * Enable Morgan logging middleware in development environment.
 * @memberof app
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

/**
 * Parse incoming JSON data into req.body.
 * @memberof app
 */
app.use(express.json());

/**
 * Route handling for books API.
 * @memberof app
 * @namespace blogRoute
 */
app.use("/api/v1/blog", blogRoute);

/**
 * Route handling for authentication API.
 * @memberof app
 * @namespace authRoute
 */
app.use("/api/v1/auth", authRoute);

/**
 * Route handling for authentication API.
 * @memberof app
 * @namespace userRoute
 */
app.use("/api/v1/user", userRoute);

/**
 * Health check endpoint.
 * @memberof app
 * @name HealthCheck
 * @route {GET} /api/v1/health-check
 * @middleware
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Object} - JSON response indicating server status.
 */
app.get("/api/v1/health-check", (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: {
      msg: "server is running!",
    },
  });
});

/**
 * Handle unknown routes.
 * @memberof app
 * @name NotFound
 * @middleware
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {AppError} - 404 error for unknown routes.
 */
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/**
 * Global error handling middleware.
 * @memberof app
 * @namespace globalErrorHandler
 */
app.use(globalErrorHandler);

export default app;
