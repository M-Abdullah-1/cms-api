import { Router } from "express";
import * as bookController from "./../controllers/book.controller";

const router = Router();

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route("/:bookId")
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

export default router;
