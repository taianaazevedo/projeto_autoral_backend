import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import { PostSerie } from "@/protocols";
import { serieService } from "@/services";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";


export async function postSerie(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const user_id = req.userId;
    const { theme_id, title, streaming } = req.body as PostSerie;
    if(!title || !streaming || !theme_id) return res.sendStatus(httpStatus.BAD_REQUEST);
    
    try {
        const postSerie = await serieService.postSerie({user_id, theme_id, title, streaming});
        return res.status(httpStatus.CREATED).send(postSerie);
    } catch (error) {
        next(error);
    }
}

export async function updateSerie(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { id, title, streaming } = req.body;
    if(!title || !streaming || !id) return res.sendStatus(httpStatus.BAD_REQUEST);
    
    try {
        const updatedserie = await serieService.updateSerie(id, title, streaming);
        return res.status(httpStatus.OK).send(updatedserie);
    } catch (error) {
        next(error);
    }
}