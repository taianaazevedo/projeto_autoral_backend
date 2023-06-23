import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { prisma } from "@/config";
import { createUser } from "./factories";

export async function cleanDb() {
  await prisma.favorite.deleteMany({});
  await prisma.song.deleteMany({});
  await prisma.movie.deleteMany({});
  await prisma.serie.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.theme.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const userCreated = user || (await createUser());
  const token = jwt.sign({ userId: userCreated.id }, process.env.JWT_SECRET);
  return token;
}
