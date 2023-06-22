import { notFoundError } from "@/errors";
import { PostSong } from "@/protocols";
import { songRepository } from "@/repositories/songRepository";
import { Song } from "@prisma/client";


export async function getSongById(id: number): Promise<void>{
  const song = await songRepository.getSongById(id);
  if(!song) throw notFoundError();
}

export async function postSong({user_id, theme_id, title, performer}: PostSong):  Promise<Song>{
  const post = await songRepository.postSong({user_id, theme_id, title, performer});
  return post;
}

export async function updateSong(id: number, title: string, performer: string): Promise<Song>{
  await getSongById(id)

  const song = await songRepository.updateSong(id, title, performer);
  return song;
}

const songService = {
  postSong,
  updateSong,
};

export { songService };
