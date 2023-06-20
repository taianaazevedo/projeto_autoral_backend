import { prisma } from "@/config";
import { PostSong } from "@/protocols";
import { Song } from "@prisma/client";


export async function postSong({user_id, theme_id, title, performer}: PostSong): Promise<Song> {
  return prisma.song.create({
    data: {
      user_id,
      theme_id,
      title,
      performer,
    },
  });
}

const songRepository = {
  postSong,
};

export { songRepository };
