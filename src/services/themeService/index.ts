import { duplicatedThemeError } from "@/errors";
import themeRepository, { ThemeCreated } from "@/repositories/themeRepository";
import { Theme } from "@prisma/client";

export async function getTheme(): Promise<Theme[]> {
  const theme = await themeRepository.getTheme();
  return theme;
}

export async function createTheme({user_id, title}: ThemeCreated): Promise<ThemeCreated> {
  await findThemeByTitle(title)

  const theme = await themeRepository.createTheme({user_id, title})
  return theme
}

export async function findThemeByTitle(title: string) {
  const theme = await themeRepository.findThemeByTitle(title);
  if (theme) throw duplicatedThemeError();
  return theme;
}

const themeService = {
  getTheme,
  createTheme,
};

export default themeService;
