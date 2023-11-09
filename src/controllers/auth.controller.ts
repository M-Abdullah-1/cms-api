import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
import catchAsync from "../utils/catchAsync";

/**
 * @description     this function will generate a token according to user id.
 * @param   id
 * @returns     It will return a token
 */
const signToken = (id: any) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (JWT_SECRET !== undefined) {
    return jwt.sign({ id }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } else {
    console.log("token not generated!");
  }
};

/**
 * @name    signup
 * @description     This controller will use to create new user.
 * @returns     It will return a created user.
 */
export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  }
);

/**
 * @name    login
 * @description     this is for login
 * @returns     it will return a token
 */
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // 1) check if email and password is exist
    if (!email || !password) {
    }
    // 2) check if user exist and password is correct
    const user = (await userModel
      .findOne({ email })
      .select("+password")) as IUser;
    if (!user || !(await user.correctPassword(password, user.password))) {
    }
    // 3) If everything ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  }
);
