import { ApplicationError } from "@/protocols";

export function notFoundError(): ApplicationError {
    return {
      name: 'NotFoundError',
      message: 'There is no any theme with this name',
    };
  }