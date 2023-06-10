import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import { PostSong } from "@/protocols";
import { songService } from "@/services";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getThemesWithSongs(req: AuthenticatedRequest, res: Response, next: NextFunction){
    try {
        const themesWithSongs = await songService.getSongs();
        return res.status(httpStatus.OK).send(themesWithSongs);
    } catch (error) {
        next(error);
    }
}

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