import { postSong, updateSong } from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { songSchema, updateSongSchema } from "@/schemas";
import { Router } from "express";

const songRouter = Router();

songRouter
  .all("/*", authenticateToken)
  .post("/", validate(songSchema), postSong)
  .patch("/", validate(updateSongSchema), updateSong);

export { songRouter };
