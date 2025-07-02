import { Request, Response } from "express";
import Book from "./book.model";

const addBook = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const newBook = new Book(body);

    const savedBook = await newBook.save();
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

// get all books

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const allBooks = await Book.find({});

    if (allBooks.length === 0) {
      res.status(404).json({
        success: false,
        message: "No books found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: allBooks,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to retrieve books",
      success: false,
      error,
    });
  }
};

// get book by id

const getBookById = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to retrieve book",
      success: false,
      error,
    });
  }
};

// update book by id
const updateBookById = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const body = req.body;
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      {
        $set: body,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to update book",
      success: false,
      error,
    });
  }
};

// delete book by id

const deleteBookById = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  try {
    await Book.findOneAndDelete({ _id: bookId });
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to delete book",
      success: false,
      error,
    });
  }
};

export const BookController = {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
