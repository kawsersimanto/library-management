import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { router } from "./routes";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-lovat-eight.vercel.app",
      "https://library-management-frontend-delta-lyart.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the library server",
    status: "success",
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
