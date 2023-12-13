import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.util";
import userModel from "../models/user.model";
import { userRole } from "../enums/user.enum";

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
