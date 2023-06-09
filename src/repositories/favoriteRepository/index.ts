import { prisma } from "@/config";
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

export async function postFavorite(user_id: number, theme_id: number): Promise<Favorite>{
  return prisma.favorite.create({
    data: {
      user_id,
      theme_id
    }
  })
}

export async function deleteFavorite(id: number){
  return prisma.favorite.delete({
    where: {
      id,
    }
  })
}

export async function getFavoriteById(id: number){
  return prisma.favorite.findFirst({
    where: {
      id,
    }
  })
}

const favoriteRepository = {
  getFavorite,
  postFavorite,
  deleteFavorite,
  getFavoriteById
};

export { favoriteRepository };
