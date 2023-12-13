import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.util";
import articleModel from "../models/article.model";
import userModel from "../models/user.model";

export const createArticle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    const newArticle = await articleModel.create({
      heading: req.body.heading,
      description: req.body.description,
      category: req.body.category,
    });
    await userModel.updateOne(
      { _id: authorId },
      { $push: { article: newArticle._id } }
    );
    return res.status(200).json({
      status: "ok",
      data: {
        newArticle,
      },
    });
  }
);
