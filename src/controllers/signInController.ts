import { UserSignIn } from "@/protocols";
import { signInService } from "@/services";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as UserSignIn;
  if(!email || !password || typeof email !== "string" || typeof password !== "string") return res.sendStatus(httpStatus.BAD_REQUEST)
  try {
    const signInUser = await signInService.signIn(email, password);
    return res.status(httpStatus.OK).send(signInUser);
  } catch (error) {
    next(error);
  }
}
