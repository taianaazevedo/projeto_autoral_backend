import { prisma } from "@/config";
import { PostSong } from "@/protocols";
import { Song } from "@prisma/client";


export async function getSongById(id: number){
  return prisma.song.findFirst({
    where: {
      id,
    },
  });
}

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

export async function updateSong(id: number, title: string, performer: string): Promise<Song> {
  return prisma.song.update({
    where: {
      id,
    },
    data : {
      title,
      performer
    }
  })
}

const songRepository = {
  getSongById,
  postSong,
  updateSong,
};

export { songRepository };
