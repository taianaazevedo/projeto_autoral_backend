import { badRequestError, notFoundError } from "@/errors";
import { favoriteRepository } from "@/repositories/favoriteRepository";
import { Favorite, Theme } from "@prisma/client";

export async function getFavorite(user_id: number): Promise<(Favorite & { Theme: Theme })[]> {
  const favorite = await favoriteRepository.getFavorite(user_id);
  return favorite;
}

export async function postFavorite(user_id: number, theme_id: number): Promise<Favorite> {
  const postFavorite = await favoriteRepository.postFavorite(user_id, theme_id);
  return postFavorite;
}

export async function deleteFavorite(id: number): Promise<void> {
  const idExist = await getFavoriteById(id);
  if (!idExist) throw notFoundError();

  await favoriteRepository.deleteFavorite(id);
}

export async function getFavoriteById(id: number): Promise<Favorite> {
  const favId = await favoriteRepository.getFavoriteById(id);
  return favId;
}

const favoriteService = {
  getFavorite,
  postFavorite,
  deleteFavorite,
};

export { favoriteService };
