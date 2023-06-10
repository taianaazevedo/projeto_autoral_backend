import { prisma } from "@/config";
import { PostBook, ThemeParams } from "@/protocols";
import { Book } from "@prisma/client";

export async function getBooks(): Promise<(Book & ThemeParams)[]> {
  return prisma.book.findMany({
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

export async function postBook({ user_id, theme_id, title, author }: PostBook) {
  return prisma.book.create({
    data: {
      user_id,
      theme_id,
      title,
      author,
    },
  });
}

const bookRepository = {
    getBooks,
    postBook,
};

export { bookRepository };