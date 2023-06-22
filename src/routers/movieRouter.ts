import { postMovie, updateMovie } from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { movieSchema, updateMovieSchema } from "@/schemas";
import { Router } from "express";

const movieRouter = Router();

movieRouter
  .all("/*", authenticateToken)
  .patch("/", validate(updateMovieSchema), updateMovie)
  .post("/", validate(movieSchema), postMovie);

export { movieRouter };
