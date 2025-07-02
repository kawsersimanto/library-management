import { Router } from "express";
import { BorrowBookController } from "./borrow-book.controller";

const router = Router();

router.post("/", BorrowBookController.borrowBookCreation);
router.get("/", BorrowBookController.borrowBookSummary);

export const BorrowBookRoutes = router;
