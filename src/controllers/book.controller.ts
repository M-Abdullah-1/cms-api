import bookModel from "../models/book.model";
import express from "express";

exports.getAllBooks = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const book = await bookModel.find();
    res.status(200).json({
      status: "success",
      result: book.length,
      data: {
        book,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      data: {
        error,
      },
    });
  }
};

exports.getBook = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const book = await bookModel.findById(req.params.bookId);
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        error,
      },
    });
  }
};

exports.createBook = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const newBook = await bookModel.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        book: newBook,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        error,
      },
    });
  }
};

exports.updateBook = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const book = await bookModel.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        error,
      },
    });
  }
};

exports.deleteBook = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    await bookModel.findByIdAndDelete(bookId);
    res.status(200).json({
      status: "success",
      data: {
        msg: `deleteBook of this ${bookId} ID`,
      },
    });
  } catch (error) {
    const bookId = req.params.bookId;
    res.status(400).json({
      status: "fail",
      data: {
        msg: `deleteBook of this ${bookId} ID`,
      },
    });
  }
};
