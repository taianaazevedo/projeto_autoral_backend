import { UserSignIn } from "@/protocols";
import signInService from "@/services/signInService";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as UserSignIn;
  try {
    const signInUser = await signInService.signIn(email, password);
    return res.status(httpStatus.OK).send(signInUser);
  } catch (error) {
    next(error);
  }
}
