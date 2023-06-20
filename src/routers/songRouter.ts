import { postSong } from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { songSchema } from "@/schemas";
import { Router } from "express";

const songRouter = Router();

songRouter
  .all("/*", authenticateToken)
  .post("/", validate(songSchema), postSong);

export { songRouter };
