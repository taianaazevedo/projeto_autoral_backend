import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import { favoriteService } from "@/services";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getFavorite(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const user_id = req.userId as number;
  try {
    const favorite = await favoriteService.getFavorite(user_id);
    return res.status(httpStatus.OK).send(favorite);
  } catch (error) {
    next(error);
  }
}

export async function postFavorite(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const user_id = req.userId as number;
  const { theme_id } = req.body;
  if (!theme_id || isNaN(theme_id)) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const postFavorite = await favoriteService.postFavorite(user_id, theme_id);
    return res.status(httpStatus.CREATED).send(postFavorite);
  } catch (error) {
    next(error);
  }
}

export async function deleteFavorite(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    await favoriteService.deleteFavorite(id);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}
