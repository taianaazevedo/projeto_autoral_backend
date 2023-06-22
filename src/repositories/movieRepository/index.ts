import { prisma } from "@/config";
import { PostMovie } from "@/protocols";
import { Movie } from "@prisma/client";

export async function getMovieById(id: number){
  return prisma.movie.findFirst({
    where: {
      id,
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

export async function updateMovie(id: number, title: string, streaming: string): Promise<Movie> {
  return prisma.movie.update({
    where: {
      id
    },
    data: {
      title,
       streaming
    }
  })
}

const movieRepository = {
  getMovieById,
  postMovie,
  updateMovie
};

export { movieRepository };
