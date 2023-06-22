import {
  createTheme,
  getTheme,
  getThemeById,
  getThemeByName,
  getThemesFromUser,  
  deleteTheme, 
} from "@/controllers";
import { validate } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { themeSchema } from "@/schemas";
import { Router } from "express";

const themeRouter = Router();
themeRouter
  .all("/*", authenticateToken)
  .get("/mythemes", getThemesFromUser)
  .get("/allthemes", getTheme)
  .get("/:id", getThemeById)
  .get("/", getThemeByName) 
  .post("/", validate(themeSchema), createTheme)
  .delete("/:id", deleteTheme);

export { themeRouter };
