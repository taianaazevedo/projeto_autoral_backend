import { faker } from "@faker-js/faker";
import { prisma } from "@/config";

export async function createTheme(user_id: number, title?: string) {
  return await prisma.theme.create({
    data: {
      title: title || faker.word.words({ count: 5 }),
      user_id,
    },
  });
}
