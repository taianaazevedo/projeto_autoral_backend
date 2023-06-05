import bcrypt from "bcrypt";
import { duplicatedEmailError } from "@/errors/duplicatedEmailError";
import signUpRepository from "@/repositories/signUpRepository.ts";
import { User } from "@prisma/client";

export async function signUp(
  name: string,
  email: string,
  password: string,
  imgUrl: string
): Promise<User> {
  await validateEmail(email);

  const hashedPassword = await bcrypt.hash(password, 12);

  return await signUpRepository.createUser(name, email, hashedPassword, imgUrl);
}

async function validateEmail(email: string) {
  const duplicatedEmail = await signUpRepository.findByEmail(email);
  if (duplicatedEmail) throw duplicatedEmailError();
}

const signUpService = {
  signUp,
};

export default signUpService;
