import { prisma } from "@/config";
import { PostSong, ThemeParams } from "@/protocols";
import { Song } from "@prisma/client";


export async function getSongs(): Promise<(Song & ThemeParams)[]> {
  return prisma.song.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      Theme: {
        select: {
          id: true,
          title: true,
        },
      },
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

const songRepository = {
  getSongs,
  postSong,
};

export { songRepository };
