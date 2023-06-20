import { PostBook } from "@/protocols";
import { bookRepository } from "@/repositories/bookRepository";
import { Book } from "@prisma/client";


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
  postBook,
};

export { bookService };
