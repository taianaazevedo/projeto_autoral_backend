import { getFavorite, postFavorite } from "@/controllers/favoriteController";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { Router } from "express";

const favoriteRouter = Router();

favoriteRouter.all("/*", authenticateToken)
.get("/", getFavorite)
.post("/:id", postFavorite)

export { favoriteRouter };
