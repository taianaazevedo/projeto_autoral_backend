
import { getTheme } from "@/controllers";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { Router } from "express";

const themeRouter = Router();
themeRouter.all('/*', authenticateToken)
themeRouter.get("/", getTheme);

export { themeRouter };