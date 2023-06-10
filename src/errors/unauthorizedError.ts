import { ApplicationError } from "@/protocols";

export function unauthorizedError(): ApplicationError {
  return {
    name: "unauthorizedError",
    message: "Unauthorized access",
  };
}
