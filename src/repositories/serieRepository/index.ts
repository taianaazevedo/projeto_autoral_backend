import { prisma } from "@/config";
import { PostSerie, ThemeParams } from "@/protocols";
import { Serie } from "@prisma/client";

export async function getSeries(): Promise<(Serie & ThemeParams)[]> {
  return prisma.serie.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      Theme: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
}

export async function postSerie({user_id, theme_id, title, streaming}: PostSerie): Promise<Serie> {
  return prisma.serie.create({
    data: {
      user_id,
      theme_id,
      title,
      streaming,
    },
  });
}

const serieRepository = {
  getSeries,
  postSerie,
};

export { serieRepository };
