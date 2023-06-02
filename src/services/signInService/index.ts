import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from "@/errors/invalidCredentialError";
import signUpRepository from "@/repositories/signUpRepository.ts";

export async function signIn(email: string, password: string) {
  const user = await verifyCredential(email);
  await verifyPassword(password, user.password)

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return {
    user: user.id,
    email: user.email,
    name: user.name,
    imgUrl: user.imgUrl,
    token,
  };
}

export async function verifyCredential(email: string) {
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

export default signInService;
