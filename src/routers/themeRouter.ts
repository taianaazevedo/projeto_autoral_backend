import { createTheme, getTheme } from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { themeSchema } from "@/schemas";
import { Router } from "express";

const themeRouter = Router();
themeRouter
  .all("/*", authenticateToken)
  .get("/", getTheme)
  .post("/", validate(themeSchema), createTheme);

export { themeRouter };
