import { Router } from "express";
import articleRoute from "./../routes/article.route";
import * as blogController from "./../controllers/blog.controller";

const router = Router();

router.use("/author/:authorId/article", articleRoute);

router.route("/author/:authorId").post(blogController.createArticle);

export default router;
