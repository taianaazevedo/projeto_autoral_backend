import { favoriteRepository } from "@/repositories/favoriteRepository";

export async function getFavorite(user_id: number) {
  const favorite = await favoriteRepository.getFavorite(user_id);
  return favorite
}

const favoriteService = {
  getFavorite,
};

export { favoriteService };
