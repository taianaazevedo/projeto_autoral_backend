import { PostSerie } from "@/protocols";
import { serieRepository } from "@/repositories/serieRepository";

export async function getSeries() {
  const series = await serieRepository.getSeries();
  return series;
}

export async function postSerie({user_id, theme_id, title, streaming}: PostSerie){
  const post = await serieRepository.postSerie({user_id, theme_id, title, streaming});
  return post;
}

const serieService = {
  getSeries,
  postSerie,
};

export { serieService };
