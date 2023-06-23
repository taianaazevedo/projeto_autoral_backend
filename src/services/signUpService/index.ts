import bcrypt from "bcrypt";
import { duplicatedEmailError } from "@/errors/duplicatedEmailError";
import { signUpRepository } from "@/repositories/signUpRepository/index";
import { UserCreated } from "@/protocols";

export async function signUp(name: string, email: string, password: string, imgUrl: string): Promise<UserCreated> {
  await validateEmail(email);

  const hashedPassword = await bcrypt.hash(password, 12);

  const userCreated = await signUpRepository.createUser(name, email, hashedPassword, imgUrl);

  return userCreated;
}

async function validateEmail(email: string) {
  const duplicatedEmail = await signUpRepository.findByEmail(email);
  if (duplicatedEmail) throw duplicatedEmailError();
}

const signUpService = {
  signUp,
};

export { signUpService };
