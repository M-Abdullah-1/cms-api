import { Router } from "express";
import * as articleController from "./../controllers/article.controller";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(articleController.getArticles)
  .post(articleController.createArticle);
router.route("/:articleId").put(articleController.updateArticle);

export default router;
