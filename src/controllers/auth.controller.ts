import { Request, Response, NextFunction } from "express";
import userModel from "./../models/user.model";
import { IUser } from "./../interfaces/user.interface";
import catchAsync from "../utils/catchAsync.util";
import { signToken } from "./../utils/token.util";

/**
 * Handles user signup by creating a new user, generating a JWT token, and sending the token in the response.
 *
 * @function signup
 * @memberof controllers.auth
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - A promise resolving to void.
 * @throws {AppError} - Throws an error if user creation fails or if there's an issue signing the token.
 */
export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    /**
     * Create a new user with the provided information.
     *
     * @type {IUser}
     */
    const newUser = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    /**
     * Sign a JWT token for the newly created user.
     *
     * @type {string}
     */
    const token = signToken(newUser._id);

    /**
     * Send a success response with the generated token and user data.
     */
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
 * Handles user login by validating credentials and providing a JWT token upon success.
 *
 * @function login
 * @memberof controllers.auth
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - A promise resolving to void.
 * @throws {AppError} - Throws an error if email or password is missing, user doesn't exist, or the password is incorrect.
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
    res.status(200).header("Bearer", token).json({
      status: "success",
      token,
    });
  }
);
