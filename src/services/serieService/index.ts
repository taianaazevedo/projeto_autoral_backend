import { notFoundError } from "@/errors";
import { PostSerie } from "@/protocols";
import { serieRepository } from "@/repositories/serieRepository";
import { Serie } from "@prisma/client";


export async function getSerieById(id: number): Promise<void>{
  const serie = await serieRepository.getSerieById(id)
  if(!serie) throw notFoundError();
}

export async function postSerie({user_id, theme_id, title, streaming}: PostSerie): Promise<Serie>{
  const post = await serieRepository.postSerie({user_id, theme_id, title, streaming});
  return post;
}

export async function updateSerie(id: number, title: string, streaming: string): Promise<Serie> {
  await getSerieById(id)
  
  const update = await serieRepository.updateSerie(id, title, streaming);
  return update;
}

const serieService = {
  getSerieById,
  postSerie,
  updateSerie,
};

export { serieService };
