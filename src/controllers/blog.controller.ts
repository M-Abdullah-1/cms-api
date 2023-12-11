import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.util";
import articleModel from "../models/article.model";

export const createArticle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const article = await articleModel.create(req.body);
    return res.status(200).json({
      status: "ok",
      data: {
        article,
      },
    });
  }
);
