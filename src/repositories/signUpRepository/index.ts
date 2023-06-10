import { prisma } from "@/config";
import { User } from "@prisma/client";

async function findByEmail(email: string): Promise<User> {
  return prisma.user.findFirst({
    where: { email },
  });
}

async function createUser(name: string, email: string, password: string, imgUrl: string): Promise<User> {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
      imgUrl,
    },
  });
}

const signUpRepository = {
  findByEmail,
  createUser,
};

export { signUpRepository };
