import { Request, Response, NextFunction } from "express";

interface IError extends Error {
  statusCode?: number;
  status?: string;
}

export default (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode as number).json({
    status: err.status,
    message: err.message,
  });
};
