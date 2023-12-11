import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.util";

export const createArticle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
  }
);
