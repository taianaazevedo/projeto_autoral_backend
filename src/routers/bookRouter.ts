import { getThemesWithBooks, postBook } from "@/controllers";
import { validate } from "@/middlewares";
import { bookSchema } from "@/schemas";
import { Router } from "express";

const bookRouter = Router();

bookRouter
  .all("/*")
  .get("/", getThemesWithBooks)
  .post("/", validate(bookSchema), postBook);

export { bookRouter };
