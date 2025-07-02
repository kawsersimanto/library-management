import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  author: z.string().min(1, "Author is required").trim(),
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      message: `Genre must be one of the following: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY`,
    }
  ),
  isbn: z.string().min(1, "ISBN is required"),
  description: z.string().trim().optional(),
  copies: z.number().min(1, "At least 1 copy is required").positive({
    message: "Copies must be a positive number",
  }),
  available: z.boolean().default(true),
});

export default bookSchema;
