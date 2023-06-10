import { prisma } from "@/config";
import { PostMovie, ThemeParams } from "@/protocols";
import { Movie } from "@prisma/client";

export async function getMovies(): Promise<(Movie & ThemeParams)[]> {
  return prisma.movie.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      Theme: {
        select: {
          id: true,
          title: true,
        },
      },
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
