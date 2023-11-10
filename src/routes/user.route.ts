import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";

/**
 * Express router for authentication-related routes.
 *
 * @type {Router}
 */
const router = Router();

/**
 * Route for user signup.
 *
 * @name POST /api/v1/auth/signup
 * @function
 * @memberof module:routes/authRoute
 */
router.post("/signup", signup);

/**
 * Route for user login.
 *
 * @name POST /api/v1/auth/login
 * @function
 * @memberof module:routes/authRoute
 */
router.post("/login", login);

/**
 * Exports the router.
 *
 * @exports router
 */
export default router;
