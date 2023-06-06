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

export async function findThemeByTitle(title: string) {
  return prisma.theme.findUnique({
    where: {
      title,
    },
  });
}

export type ThemeCreated = Omit<Theme, 'id' | 'createdAt' | 'updatedAt'>

const themeRepository = {
  getTheme,
  findThemeByTitle,
  createTheme,
};

export default themeRepository;
