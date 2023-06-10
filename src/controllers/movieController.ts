import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import { PostMovie } from "@/protocols";
import { movieService } from "@/services";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getThemeWithMovies(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const themesWithMovies = await movieService.getThemeWithMovies();
    return res.status(httpStatus.OK).send(themesWithMovies);
  } catch (error) {
    next(error);
  }
}

export async function postMovie(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const user_id = req.userId;
  const { theme_id, title, streaming } = req.body as PostMovie;
  if (!title || !streaming || !theme_id)
    return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const postMovie = await movieService.postMovie({user_id, theme_id, title, streaming});
    return res.status(httpStatus.CREATED).send(postMovie);
  } catch (error) {
    next(error);
  }
}
