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
