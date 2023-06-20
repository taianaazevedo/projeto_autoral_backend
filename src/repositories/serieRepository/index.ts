import { prisma } from "@/config";
import { PostSerie } from "@/protocols";
import { Serie } from "@prisma/client";


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
  postSerie,
};

export { serieRepository };
