import {faker} from '@faker-js/faker';
import { prisma } from '@/config';

export async function createTheme(user_id: number) {
  return await prisma.theme.create({
    data: {
      title: faker.word.words({count: 5}),
      user_id,
    },
  });
}