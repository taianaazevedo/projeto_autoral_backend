import { PostSong, ThemeParams } from "@/protocols";
import { songRepository } from "@/repositories/songRepository";
import { Song } from "@prisma/client";

export async function getSongs(): Promise<(Song & ThemeParams)[]> {
  const songs = await songRepository.getSongs();
  return songs;
}

export async function postSong({user_id, theme_id, title, performer}: PostSong) {
  const post = await songRepository.postSong({user_id, theme_id, title, performer});
  return post;
}

const songService = {
  getSongs,
  postSong,
};

export { songService };
