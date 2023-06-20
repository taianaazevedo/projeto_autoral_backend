import { PostSerie } from "@/protocols";
import { serieRepository } from "@/repositories/serieRepository";
import { Serie } from "@prisma/client";


export async function postSerie({user_id, theme_id, title, streaming}: PostSerie): Promise<Serie>{
  const post = await serieRepository.postSerie({user_id, theme_id, title, streaming});
  return post;
}

const serieService = {
  postSerie,
};

export { serieService };
