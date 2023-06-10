import { prisma } from "@/config";
import { PostSong } from "@/protocols";
import { Song, Theme } from "@prisma/client";

export async function getSongs(): Promise<(Song & { Theme: Theme })[]> {
  return prisma.song.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      Theme: true,
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
