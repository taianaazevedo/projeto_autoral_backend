import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import { PostSong } from "@/protocols";
import { songService } from "@/services";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";


export async function postSong(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const user_id = req.userId;
    const { title, performer, theme_id } = req.body as PostSong;
    if(!title || !performer || !theme_id) return res.sendStatus(httpStatus.BAD_REQUEST);

    try {
        const postSong = await songService.postSong({user_id, theme_id, title, performer});
        return res.status(httpStatus.CREATED).send(postSong);       
    } catch (error) {
        next(error);
    }
}

export async function updateSong(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { title, performer, id } = req.body;
    if(!title || !performer || !id) return res.sendStatus(httpStatus.BAD_REQUEST);

    try {
        const songUpdated = await songService.updateSong(id, title, performer);
        return res.status(httpStatus.OK).send(songUpdated);       
    } catch (error) {
        next(error);
    }
}