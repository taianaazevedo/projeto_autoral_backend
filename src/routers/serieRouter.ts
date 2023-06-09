import { getThemesWithSeries, postSerie } from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { serieSchema } from "@/schemas";
import { Router } from "express";

const serieRouter = Router();

serieRouter
  .all("/*", authenticateToken)
  .get("/", getThemesWithSeries)
  .post("/", validate(serieSchema), postSerie);

export { serieRouter };
