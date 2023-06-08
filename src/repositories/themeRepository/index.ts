import { prisma } from "@/config";
import { Theme } from "@prisma/client";


export async function getTheme(): Promise<Theme[]> {
  return prisma.theme.findMany({});
}

export async function createTheme({user_id, title}: ThemeCreated): Promise<ThemeCreated> {
  return prisma.theme.create({
    data: {
      user_id,
      title,
    },
  });
}

export async function getThemeById(theme_id: number): Promise<Theme> {
  return prisma.theme.findUnique({
    where: {
      id: theme_id,
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
  return prisma.theme.findUnique({
    where: {
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
};

export default themeRepository;
