import { getSongs, postSong } from "@/controllers/songController";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { songSchema } from "@/schemas";
import { Router } from "express";

const songRouter = Router();

songRouter
  .all("/*", authenticateToken)
  .get("/", getSongs)
  .post("/:id", validate(songSchema), postSong);

export { songRouter };
