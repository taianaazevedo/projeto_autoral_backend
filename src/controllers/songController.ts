import { AuthenticatedRequest } from "@/middlewares/authenticationMiddleware";
import { SongParams } from "@/protocols";
import { songService } from "@/services";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getSongs(req: AuthenticatedRequest, res: Response, next: NextFunction){
    try {
        const songs = await songService.getSongs()
        return res.status(httpStatus.OK).send(songs)
    } catch (error) {
        next(error)
    }
}

export async function postSong(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const user_id = req.userId
    const theme_id = Number(req.params.id)
    const { title, performer } = req.body as SongParams
    if(!title || !performer || !theme_id) return res.sendStatus(httpStatus.BAD_REQUEST)

    try {
        const postSong = await songService.postSong({user_id, theme_id, title, performer})
        return res.status(httpStatus.CREATED).send(postSong)        
    } catch (error) {
        next(error)
    }
}