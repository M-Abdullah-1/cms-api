import { Router } from "express";
import * as blogController from "./../controllers/blog.controller";

const router = Router();

router.route("/author/:authorId").post(blogController.createArticle);
router.route("/article/:articleId").put(blogController.updateArticle);

export default router;
