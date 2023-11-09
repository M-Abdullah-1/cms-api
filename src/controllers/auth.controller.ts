import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";

/**
 * @name    signup
 * @description     This controller will use to create new user.
 * @returns     It will return a created user.
 */
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const JWT_SECRET = process.env.JWT_SECRET;
  let token = null;
  if (JWT_SECRET !== undefined) {
    token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
};
