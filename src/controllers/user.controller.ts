import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.util";
import userModel from "../models/user.model";
import { userRole } from "../enums/user.enum";
import AppError from "../utils/appError.util";

/**
 * Middleware to change user role to author.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
export const changeRoleToAuthor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // get user ID from the request object
    const userId = req.params.id;

    // change the user role to author.
    if (req.query.changeRoleToAuthor) {
      const updatedUser = await userModel.findByIdAndUpdate(userId, {
        role: userRole.AUTHOR,
      });
      res.status(201).json({
        message: "Now you become an author!",
      });
    }
  }
);

/**
 * Middleware to update user information.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        name: req.body.name,
        email: req.body.email,
        about: req.body.about,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        insta: req.body.insta,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({
      status: "update",
      data: {
        user,
      },
    });
  }
);

/**
 * Middleware to fetch user by ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {Promise<void>} - Promise representing the asynchronous operation.
 */
export const fetchUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) return next(new AppError("User not found!", 400));
    res.status(200).json({
      status: "found",
      data: {
        user,
      },
    });
  }
);
