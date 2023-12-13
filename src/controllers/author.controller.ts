import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.util";
import articleModel from "../models/article.model";
import userModel from "../models/user.model";
