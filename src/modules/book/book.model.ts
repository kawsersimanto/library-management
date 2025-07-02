import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      index: true,
      unique: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: [
        true,
        `Genre must be one of the following: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY`,
      ],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      trim: true,
      unique: true,
      index: true,
    },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: [0, "Number of copies cannot be negative"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.pre("save", async function (next) {
  const existingBook = await Book.findOne({
    $or: [{ isbn: this.isbn }, { title: this.title, author: this.author }],
  });

  if (existingBook) {
    const error = new Error(
      "A book with the same ISBN or title by the same author already exists."
    );
    error.name = "DuplicateBookError";
    next(error);
  }

  next();
});

const Book = model<IBook>("Book", bookSchema);

export default Book;
