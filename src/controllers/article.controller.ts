import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.util";
import articleModel from "../models/article.model";

export const updateArticle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { articleId } = req.params;
    const { heading, description, category } = req.body;
    const updatedArticle = await articleModel.findByIdAndUpdate(
      { _id: articleId },
      {
        heading,
        description,
        category,
      },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      status: "success",
      data: {
        updatedArticle,
      },
    });
  }
);
