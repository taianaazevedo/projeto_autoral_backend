import { favoriteRepository } from "@/repositories/favoriteRepository";
import { Favorite, Theme } from "@prisma/client";

export async function getFavorite(user_id: number): Promise<(Favorite & {
  Theme: Theme;
})[]> {
  const favorite = await favoriteRepository.getFavorite(user_id);
  return favorite
}

export async function postFavorite({user_id, theme_id}: PostFavoriteParams): Promise<Favorite>{
  const postFavorite = await favoriteRepository.postFavorite({user_id, theme_id})
  return postFavorite
}

export type PostFavoriteParams = {
  user_id: number,
  theme_id: number
}

const favoriteService = {
  getFavorite,
  postFavorite
};

export { favoriteService };
