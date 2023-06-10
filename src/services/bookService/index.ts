import { PostBook, ThemeParams } from "@/protocols";
import { bookRepository } from "@/repositories/bookRepository";
import { Book } from "@prisma/client";

export async function getBooks(): Promise<(Book & ThemeParams)[]> {
  const books = await bookRepository.getBooks();
  return books;
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

const bookService = {
  getBooks,
  postBook,
};

export { bookService };
