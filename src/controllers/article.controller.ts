import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.util";
import articleModel from "../models/article.model";
import userModel from "../models/user.model";
import AppError from "../utils/appError.util";

export const getArticles = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    if (authorId) {
      const { article: articleIds }: any = await userModel
        .findById(authorId)
        .select("article");
      if (!articleIds) return next(new AppError("Articles not found.", 404));

      const articles = await articleModel.find({ _id: { $in: articleIds } });

      return res.status(200).json({
        status: "success",
        result: articles.length,
        data: {
          articles,
        },
      });
    }

    const articles = await articleModel.find();
    res.status(200).json({
      status: "success",
      result: articles.length,
      data: {
        articles,
      },
    });
  }
);

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
