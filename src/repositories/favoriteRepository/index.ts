import { prisma } from "@/config";
import { PostFavoriteParams } from "@/services";
import { Favorite, Theme } from "@prisma/client";

export async function getFavorite(user_id: number):Promise<(Favorite & {
  Theme: Theme;
})[]>{
  return prisma.favorite.findMany({
    where: {
      user_id,
    },
    include: {
      Theme: true,
    },
  });
}

export async function postFavorite({user_id, theme_id}: PostFavoriteParams): Promise<Favorite>{
  return prisma.favorite.create({
    data: {
      user_id,
      theme_id
    }
  })
}

const favoriteRepository = {
  getFavorite,
  postFavorite
};

export { favoriteRepository };
