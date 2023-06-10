import { prisma } from "@/config";
import { PostSerie } from "@/protocols";
import { Serie, Theme } from "@prisma/client";

export async function getSeries(): Promise<(Serie & { Theme: Theme })[]> {
  return prisma.serie.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      Theme: true,
    },
  });
}

export async function postSerie({user_id, theme_id, title, streaming}: PostSerie) {
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
