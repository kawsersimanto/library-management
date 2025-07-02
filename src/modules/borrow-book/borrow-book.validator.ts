import { Types } from "mongoose";
import { z } from "zod";

const borrowBookSchema = z.object({
  book: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  dueDate: z.coerce.date().refine((date) => date > new Date(), {
    message: "Due date must be in the future",
  }),
});

export default borrowBookSchema;
