import { Request, Response } from "express";
import BorrowBook from "./borrow-book.model";

const borrowBookCreation = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const newBorrowedBook = new BorrowBook(body);
    await newBorrowedBook.borrowBook(body.quantity);
    const savedBorrowedBook = await newBorrowedBook.save();
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: savedBorrowedBook,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to borrow book",
      success: false,
      error: Object.keys(error).length !== 0 ? error : error.message,
    });
  }
};

const borrowBookSummary = async (req: Request, res: Response) => {
  try {
    const borrowedBooks = await BorrowBook.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: 1,
            isbn: 1,
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: borrowedBooks,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch borrowed books",
      success: false,
      error: Object.keys(error).length !== 0 ? error : error.message,
    });
  }
};

export const BorrowBookController = {
  borrowBookCreation,
  borrowBookSummary,
};
