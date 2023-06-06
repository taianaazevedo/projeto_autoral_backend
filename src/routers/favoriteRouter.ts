import { getFavorite } from "@/controllers/favoriteController";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { Router } from "express";

const favoriteRouter = Router();

favoriteRouter.all("/*", authenticateToken)
.get("/", getFavorite)

export { favoriteRouter };
