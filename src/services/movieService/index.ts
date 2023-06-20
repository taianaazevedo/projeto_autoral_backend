import { PostMovie } from "@/protocols";
import { movieRepository } from "@/repositories/movieRepository";
import { Movie } from "@prisma/client";


export async function postMovie({user_id, theme_id, title, streaming}: PostMovie): Promise<Movie> {
  const post = await movieRepository.postMovie({
    user_id,
    theme_id,
    title,
    streaming,
  });
  return post;
}

const movieService = {
  postMovie,
};

export { movieService };
