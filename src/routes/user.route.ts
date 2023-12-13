import { Router } from "express";
import * as userController from "./../controllers/user.controller";

const router = Router();

router
  .route("/:id")
  // fetch user data by its ID
  .get(userController.fetchUserById)
  // change the user role to author
  .patch(userController.changeRoleToAuthor)
  // update user bio
  .put(userController.updateUser);

export default router;
