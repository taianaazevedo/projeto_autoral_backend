import { prisma } from "@/config";
import { PostBook } from "@/protocols";
import { Book } from "@prisma/client";


export async function postBook({ user_id, theme_id, title, author }: PostBook): Promise<Book> {
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
    postBook,
};

export { bookRepository };