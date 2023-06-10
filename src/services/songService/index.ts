import { PostSong } from "@/protocols";
import { songRepository } from "@/repositories/songRepository";
import { Song, Theme } from "@prisma/client";

export async function getSongs(): Promise<(Song & { Theme: Theme })[]> {
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
