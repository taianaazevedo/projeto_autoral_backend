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
