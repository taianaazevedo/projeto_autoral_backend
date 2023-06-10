import { ApplicationError } from "@/protocols";

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are incorrect",
  };
}
