import { deleteFavorite, getFavorite, postFavorite } from "@/controllers";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";
import { Router } from "express";

const favoriteRouter = Router();

favoriteRouter
  .all("/*", authenticateToken)
  .get("/", getFavorite)
  .post("/", postFavorite)
  .delete("/:id", deleteFavorite);

export { favoriteRouter };
