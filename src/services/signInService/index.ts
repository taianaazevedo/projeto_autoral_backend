import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "@/errors/invalidCredentialError";
import { signUpRepository } from "@/repositories/signUpRepository";
import { UserCredentials } from "@/protocols";
import { User } from "@prisma/client";

export async function signIn(email: string, password: string): Promise<UserCredentials> {
  const user = await verifyCredential(email);
  await verifyPassword(password, user.password);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return {
    id: user.id,
    name: user.name,
    imgUrl: user.imgUrl,
    token,
  };
}

export async function verifyCredential(email: string): Promise<User> {
  const user = await signUpRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();

  return user;
}

export async function verifyPassword(password: string, userPassword: string) {
  const verifyPassword = await bcrypt.compare(password, userPassword);
  if (!verifyPassword) throw invalidCredentialsError();
}

const signInService = {
  signIn,
};

export { signInService };
