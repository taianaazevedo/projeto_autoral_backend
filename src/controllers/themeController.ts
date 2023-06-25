import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import { Search, ThemeTitle } from "@/protocols";
import { themeService } from "@/services";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getTheme(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const themes = await themeService.getTheme();
    return res.status(httpStatus.OK).send(themes);
  } catch (error) {
    next(error);
  }
}

export async function getThemeById(req: AuthenticatedRequest, res: Response, next: NextFunction){
  const theme_id = Number(req.params.id);
  if(isNaN(theme_id) || theme_id <= 0) return res.sendStatus(httpStatus.BAD_REQUEST);
  
  try {
    const themeById = await themeService.getThemeById(theme_id);
    return res.status(httpStatus.OK).send(themeById);
  } catch (error) {
    next(error);    
  }
}

export async function getThemeByName(req: AuthenticatedRequest, res: Response, next: NextFunction){
  const { search } = req.query as Search;
  if(!search) return res.sendStatus(httpStatus.BAD_REQUEST)
  try {
    const theme = await themeService.getThemeByName(search);
    return res.status(httpStatus.OK).send(theme);
  } catch (error) {
    next(error);
  }
}

export async function getThemesFromUser(req: AuthenticatedRequest, res: Response, next: NextFunction){
  const user_id = req.userId;
  try {
    const themeUser = await themeService.getThemesFromUser(user_id);
    return res.status(httpStatus.OK).send(themeUser);
  } catch (error) {
    next(error);
  }
}

export async function createTheme(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const user_id = req.userId;
  const { title } = req.body as ThemeTitle
  if(!title) return res.sendStatus(httpStatus.BAD_REQUEST);
  
  try {
    const createdTheme = await themeService.createTheme({ user_id, title });
    return res.status(httpStatus.CREATED).send(createdTheme);
  } catch (error) {
    next(error);
  }
}

export async function deleteTheme(req: AuthenticatedRequest, res: Response, next: NextFunction){
  const theme_id = Number(req.params.id);
  if(isNaN(theme_id) || theme_id <= 0) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    await themeService.deleteTheme(theme_id)
    return res.sendStatus(httpStatus.OK)
  } catch (error) {
    next(error)
  }
}


export async function updateTheme(req: AuthenticatedRequest, res: Response, next: NextFunction){
  const theme_id = Number(req.params.id);
  const { title } = req.body as ThemeTitle
  if(isNaN(theme_id) || theme_id <= 0 || !title) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const themeUpdated = await themeService.updateTheme(title, theme_id)
    return res.status(httpStatus.OK).send(themeUpdated)
  } catch (error) {
    next(error)
  }
}