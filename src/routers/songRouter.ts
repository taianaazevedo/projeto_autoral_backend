import { getThemesWithSongs, postSong } from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { songSchema } from "@/schemas";
import { Router } from "express";

const songRouter = Router();

songRouter
  .all("/*", authenticateToken)
  .get("/", getThemesWithSongs)
  .post("/", validate(songSchema), postSong);

export { songRouter };
