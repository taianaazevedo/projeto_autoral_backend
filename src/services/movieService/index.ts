import { notFoundError } from "@/errors";
import { PostMovie } from "@/protocols";
import { movieRepository } from "@/repositories/movieRepository";
import { Movie } from "@prisma/client";

export async function getMovieById(id: number){
  const movie = await movieRepository.getMovieById(id)
  if(!movie) throw notFoundError();
}

export async function postMovie({user_id, theme_id, title, streaming}: PostMovie): Promise<Movie> {
  const post = await movieRepository.postMovie({
    user_id,
    theme_id,
    title,
    streaming,
  });
  return post;
}

export async function updateMovie(id: number, title: string, streaming: string): Promise<Movie>{
  await getMovieById(id)
  
  const update = await movieRepository.updateMovie(id, title, streaming)
  return update
}

const movieService = {
  getMovieById,
  postMovie,
  updateMovie
};

export { movieService };
