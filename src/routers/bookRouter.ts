import { postBook } from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { bookSchema } from "@/schemas";
import { Router } from "express";

const bookRouter = Router();

bookRouter
  .all("/*", authenticateToken)
  .post("/", validate(bookSchema), postBook);

export { bookRouter };
