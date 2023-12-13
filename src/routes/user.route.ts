import { Router } from "express";
import * as userController from "./../controllers/user.controller";

const router = Router();

router
  .route("/:id")
  .patch(userController.changeRoleToAuthor)
  .put(userController.updateUser);

export default router;
