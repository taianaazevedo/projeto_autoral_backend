import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import themeService from "@/services/themeService";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getTheme(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const themes = await themeService.getTheme();
    return res.status(httpStatus.OK).send(themes);
  } catch (error) {
    next(error);
  }
}

export async function createTheme(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const user_id = req.userId;
  const { title } = req.body;
  try {
    const createdTheme = await themeService.createTheme({ user_id, title });
    return res.status(httpStatus.CREATED).send(createdTheme);
  } catch (error) {
    next(error);
  }
}
