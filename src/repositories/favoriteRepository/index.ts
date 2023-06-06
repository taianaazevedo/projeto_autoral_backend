import { prisma } from "@/config";

export async function getFavorite(user_id: number) {
  return prisma.favorite.findMany({
    where: {
      user_id,
    },
    include: {
      Theme: true,
    },
  });
}

const favoriteRepository = {
  getFavorite,
};

export { favoriteRepository };
