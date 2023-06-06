import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import { favoriteService } from "@/services";
import themeService from "@/services/themeService";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getFavorite(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const user_id = req.userId as number
    try {
        const favorite = await favoriteService.getFavorite(user_id)
        return res.status(httpStatus.OK).send(favorite)
    } catch (error) {
        next(error)
    }

}

