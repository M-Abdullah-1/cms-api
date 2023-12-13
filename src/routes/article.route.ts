import { Router } from "express";
import * as articleController from "./../controllers/article.controller";

const router = Router();

router.route("/:articleId").put(articleController.updateArticle);

export default router;
