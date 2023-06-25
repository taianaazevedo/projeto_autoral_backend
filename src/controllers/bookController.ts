import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import { PostBook } from "@/protocols";
import { bookService } from "@/services/bookService";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";


export async function postBook(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const user_id = req.userId;
  const { theme_id, title, author } = req.body as PostBook;
  if (!title || !author || !theme_id) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const postBook = await bookService.postBook({user_id, theme_id, title, author});
    return res.status(httpStatus.CREATED).send(postBook);
  } catch (error) {
    next(error);
  }
}

export async function updateBook(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { id, title, author } = req.body;
  if (!title || !author || !id) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const updatedBook = await bookService.updateBook(id, title, author);
    return res.status(httpStatus.OK).send(updatedBook);
  } catch (error) {
    next(error);
  }
}
