import { prisma } from "@/config";
import { PostMovie } from "@/protocols";
import { Movie, Theme } from "@prisma/client";

export async function getMovies(): Promise<(Movie & { Theme: Theme })[]> {
  return prisma.movie.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      Theme: true,
    },
  });
}

export async function postMovie({user_id, theme_id, title, streaming}: PostMovie): Promise<Movie> {
  return prisma.movie.create({
    data: {
      user_id,
      theme_id,
      title,
      streaming,
    },
  });
}

const movieRepository = {
  getMovies,
  postMovie,
};

export { movieRepository };
