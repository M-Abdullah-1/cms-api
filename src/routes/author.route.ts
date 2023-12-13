import { Router } from "express";
import articleRoute from "./article.route";
import * as authorController from "../controllers/author.controller";

const router = Router();

router.use("/:authorId/article", articleRoute);

export default router;
