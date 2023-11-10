import { Request, Response, NextFunction } from "express";

interface IError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

const sendErrorDev = (err: IError, res: Response) => {
  res.status(err.statusCode as number).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: IError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode as number).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("Error 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

export default (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }

  res.status(err.statusCode as number).json({
    status: err.status,
    message: err.message,
  });
};
