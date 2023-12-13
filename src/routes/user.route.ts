import { Router } from "express";
import * as userController from "./../controllers/user.controller";

const router = Router();

router.route("/:id").patch(userController.changeRoleToAuthor);

export default router;
