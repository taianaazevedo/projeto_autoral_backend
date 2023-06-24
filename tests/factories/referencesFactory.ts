import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export async function createSong(user_id: number, theme_id: number) {
  return prisma.song.create({
    data: {
      user_id,
      theme_id,
      title: faker.word.words({ count: 5 }),
      performer: faker.person.firstName(),
    },
  });
}

export async function createMovie(user_id: number, theme_id: number) {
  return prisma.movie.create({
    data: {
      user_id,
      theme_id,
      title: faker.word.words({ count: 5 }),
      streaming: faker.lorem.word(),
    },
  });
}

export async function createSerie(user_id: number, theme_id: number) {
  return prisma.serie.create({
    data: {
        user_id,
        theme_id,
        title: faker.word.words({ count: 5 }),
        streaming: faker.lorem.word(),
      },
  });
}

export async function createBook(user_id: number, theme_id: number) {
  return prisma.book.create({
    data: {
      user_id,
      theme_id,
      title: faker.word.words({ count: 5 }),
      author: faker.person.firstName(),
    },
  });
}
