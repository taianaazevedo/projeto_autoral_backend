import { duplicatedThemeError, notFoundError } from "@/errors";
import { ThemeReferences } from "@/protocols";
import themeRepository, { ThemeCreated } from "@/repositories/themeRepository";
import { Theme } from "@prisma/client";

export async function getTheme(): Promise<(Theme & {User: {name: string, imgUrl: string}})[]> {
  const theme = await themeRepository.getTheme();
  return theme;
}

export async function getThemeById(theme_id: number): Promise<Theme & ThemeReferences> {
  const themeById = await themeRepository.getThemeById(theme_id);
  if(!themeById) throw notFoundError();
  return themeById;
}

export async function getThemeByName(search: string): Promise<Theme[]> {
  const theme = await themeRepository.getThemeByName(search);
  return theme;
}

export async function createTheme({user_id, title}: ThemeCreated): Promise<ThemeCreated> {
  await findThemeByTitle(title);

  const theme = await themeRepository.createTheme({ user_id, title });
  return theme;
}

export async function findThemeByTitle(title: string): Promise<Theme> {
  const theme = await themeRepository.findThemeByTitle(title);
  if (theme) throw duplicatedThemeError();
  return theme;
}

export async function getThemesFromUser(user_id: number): Promise<Theme[]>{
  const themes = await themeRepository.getThemesFromUser(user_id);
  return themes;
}

export async function deleteTheme(theme_id: number): Promise<void>{
  await getThemeById(theme_id)
  
  await themeRepository.deleteTheme(theme_id);
}

export async function updateTheme(title: string, theme_id: number): Promise<Theme>{
  await getThemeById(theme_id)
  await findThemeByTitle(title)
  
  const theme = await themeRepository.updateTheme(title, theme_id);
  return theme;
}

const themeService = {
  getTheme,
  getThemeById,
  getThemeByName,
  createTheme,
  getThemesFromUser,
  deleteTheme,
  updateTheme,
};

export { themeService };
