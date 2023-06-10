import { getThemesWithMovies, postMovie } from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { movieSchema } from "@/schemas";
import { Router } from "express";

const movieRouter = Router();

movieRouter
  .all("/*", authenticateToken)
  .get("/", getThemesWithMovies)
  .post("/", validate(movieSchema), postMovie);

export { movieRouter };
