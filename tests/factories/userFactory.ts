import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker";
import { prisma } from "@/config";
import { User } from "@prisma/client";

export async function createUser(email?: string, password?: string, name?: string, imgUrl?: string): Promise<User> {
  const createdPassword = password || faker.internet.password({ length: 6 });
  const hashedPassword = await bcrypt.hash(createdPassword, 10);

  return prisma.user.create({
    data: {
      name: name || faker.person.firstName(),
      imgUrl: imgUrl || faker.internet.url(),
      email: email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}
