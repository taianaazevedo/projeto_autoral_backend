import { prisma } from "@/config";

export async function createFavorite(user_id: number, theme_id: number) {
  return await prisma.favorite.create({
    data: {
      theme_id,
      user_id,
    },
  });
}
