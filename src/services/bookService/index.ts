import { notFoundError } from "@/errors";
import { PostBook } from "@/protocols";
import { bookRepository } from "@/repositories/bookRepository";
import { Book } from "@prisma/client";

export async function getBookById(id: number): Promise<void>{
  const book = await bookRepository.getBookById(id);
  if(!book) throw notFoundError();
}

export async function postBook({user_id, theme_id, title, author}: PostBook): Promise<Book> {
  const postBook = await bookRepository.postBook({
    user_id,
    theme_id,
    title,
    author,
  });
  return postBook;
}

export async function updateBook(id: number,title: string, author: string): Promise<Book> {
  await getBookById(id)

  const update = await bookRepository.updateBook(id, title, author)
  return update
}

const bookService = {
  postBook,
  updateBook
};

export { bookService };
