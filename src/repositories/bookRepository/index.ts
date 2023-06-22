import { prisma } from "@/config";
import { PostBook } from "@/protocols";
import { Book } from "@prisma/client";

export async function getBookById(id: number){
  return prisma.book.findFirst({
    where: {
      id,
    },
  });
}


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

export async function updateBook(id: number,title: string, author: string): Promise<Book>{
  return prisma.book.update({
    where: {
      id
    },
    data: {
      title,
      author
    }
  })
}

const bookRepository = {
    getBookById,
    postBook,
    updateBook
};

export { bookRepository };