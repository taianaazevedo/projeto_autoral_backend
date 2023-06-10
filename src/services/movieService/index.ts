import { PostMovie } from "@/protocols";
import { movieRepository } from "@/repositories/movieRepository";

export async function getThemeWithMovies() {
  const themes = await movieRepository.getMovies();
  return themes;
}

export async function postMovie({user_id, theme_id, title, streaming}: PostMovie) {
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
