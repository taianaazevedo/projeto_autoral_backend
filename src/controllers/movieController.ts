import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import { PostMovie } from "@/protocols";
import { movieService } from "@/services";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";


export async function postMovie(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const user_id = req.userId;
  const { theme_id, title, streaming } = req.body as PostMovie;
  if (!title || !streaming || !theme_id) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const postMovie = await movieService.postMovie({user_id, theme_id, title, streaming});
    return res.status(httpStatus.CREATED).send(postMovie);
  } catch (error) {
    next(error);
  }
}

export async function updateMovie(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { id, title, streaming } = req.body;
  if (!title || !streaming || !id) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const updatedMovie = await movieService.updateMovie(id, title, streaming);
    return res.status(httpStatus.OK).send(updatedMovie);
  } catch (error) {
    next(error);
  }
}
