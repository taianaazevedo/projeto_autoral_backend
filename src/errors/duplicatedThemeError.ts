import { ApplicationError } from "@/protocols";

export function duplicatedThemeError(): ApplicationError {
  return {
    name: "DuplicatedThemeError",
    message: "There is already an theme with this name",
  };
}
