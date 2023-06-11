import { PostMovie, ThemeParams } from "@/protocols";
import { movieRepository } from "@/repositories/movieRepository";
import { Movie } from "@prisma/client";

export async function getThemeWithMovies(): Promise<(Movie & ThemeParams)[]> {
  const themes = await movieRepository.getMovies();
  return themes;
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

const movieService = {
  getThemeWithMovies,
  postMovie,
};

export { movieService };
