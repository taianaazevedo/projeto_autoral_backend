import { postBook, updateBook } from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { bookSchema, updateBookSchema } from "@/schemas";
import { Router } from "express";

const bookRouter = Router();

bookRouter
  .all("/*", authenticateToken)
  .patch("/", validate(updateBookSchema), updateBook)
  .post("/", validate(bookSchema), postBook);

export { bookRouter };
