import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import { PostBook } from "@/protocols";
import { bookService } from "@/services/bookService";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getThemesWithBooks(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const themesWithBooks = await bookService.getBooks();
    return res.status(httpStatus.OK).send(themesWithBooks);
  } catch (error) {
    next(error);
  }
}

export async function postBook(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const user_id = req.userId;
  console.log(user_id)
  const { theme_id, title, author } = req.body as PostBook;
  if (!title || !author || !theme_id) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const postBook = await bookService.postBook({user_id, theme_id, title, author});
    return res.status(httpStatus.CREATED).send(postBook);
  } catch (error) {
    console.log(error)
    next(error);
  }
}
