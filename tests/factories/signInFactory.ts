import { signInService } from "@/services";
import { createUser } from "./signUpFactory";
import { faker } from "@faker-js/faker";

export async function createToken() {
  const userData = {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 }),
  };
  await createUser(userData.email, userData.password);

  const login = await signInService.signIn(userData.email, userData.password);

  return login.token;
}
