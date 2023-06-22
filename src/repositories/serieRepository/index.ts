import { prisma } from "@/config";
import { PostSerie } from "@/protocols";
import { Serie } from "@prisma/client";

export async function getSerieById(id: number){
  return prisma.serie.findFirst({
    where: {
      id,
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

export async function updateSerie(id: number, title: string, streaming: string): Promise<Serie> {
  return prisma.serie.update({
    where: {
      id
    },
    data: {
      title,
      streaming
    }
  })
}

const serieRepository = {
  getSerieById,
  postSerie,
  updateSerie
};

export { serieRepository };
