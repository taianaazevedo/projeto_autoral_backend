import { postMovie } from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { movieSchema } from "@/schemas";
import { Router } from "express";

const movieRouter = Router();

movieRouter
  .all("/*", authenticateToken)
  .post("/", validate(movieSchema), postMovie);

export { movieRouter };
