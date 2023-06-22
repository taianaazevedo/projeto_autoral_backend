import { postSerie, updateSerie } from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { serieSchema, updateSerieSchema } from "@/schemas";
import { Router } from "express";

const serieRouter = Router();

serieRouter
  .all("/*", authenticateToken)
  .patch("/", validate(updateSerieSchema), updateSerie)
  .post("/", validate(serieSchema), postSerie);

export { serieRouter };
