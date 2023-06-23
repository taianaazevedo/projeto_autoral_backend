import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker";
import { User } from "@prisma/client";
import { prisma } from "@/config";

export async function createUser(name?: string, email?: string, password?: string, imgUrl?: string): Promise<User> {
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
