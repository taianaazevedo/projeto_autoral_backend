import { prisma } from "@/config";
import { ThemeReferences } from "@/protocols";
import { Theme } from "@prisma/client";

export async function getTheme(): Promise<(Theme & {User: {name: string; imgUrl: string}})[]> {
  return prisma.theme.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      User: {
        select: {
          name: true,
          imgUrl: true,
        },
      },
    },
  });
}

export async function createTheme({user_id, title}: ThemeCreated): Promise<ThemeCreated> {
  return prisma.theme.create({
    data: {
      user_id,
      title,
    },
  });
}

export async function getThemeById(theme_id: number): Promise<Theme & ThemeReferences> {
  return prisma.theme.findUnique({
    where: {
      id: theme_id,
    },
    include: {
      User: {
        select: {
          name: true,
        },
      },
      Serie: {
        select: {
          id: true,
          title: true,
          streaming: true,
        },
      },
      Song: {
        select: {
          id: true,
          title: true,
          performer: true,
        },
      },
      Movie: {
        select: {
          id: true,
          title: true,
          streaming: true,
        },
      },
      Book: {
        select: {
          id: true,
          title: true,
          author: true,
        },
      },
    },
  });
}

export async function getThemeByName(search: string): Promise<Theme[]> {
  return prisma.theme.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          title: {
            contains: search.replace(/\s/g, ""),
            mode: "insensitive",
          },
        },
      ],
    },
  });
}

export async function findThemeByTitle(title: string): Promise<Theme> {
  return prisma.theme.findFirst({
    where: {
      title: {
        equals: title,
        mode: "insensitive"
      }
    },
  });
}

export async function getThemesFromUser(user_id: number): Promise<Theme[]> {
  return prisma.theme.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      user_id,
    },
  });
}

export async function deleteTheme(theme_id: number){
  await prisma.theme.delete({
    where: {
      id: theme_id,
    },
  });
}

export async function updateTheme(title: string, theme_id: number): Promise<Theme>{
  return prisma.theme.update({
    where: {
      id: theme_id,
    },
    data: {
      title,
    },
  });
}

export type ThemeCreated = Omit<Theme, "id" | "createdAt" | "updatedAt">;

const themeRepository = {
  getTheme,
  getThemeById,
  getThemeByName,
  findThemeByTitle,
  createTheme,
  getThemesFromUser,
  deleteTheme,
  updateTheme,
};

export default themeRepository;
