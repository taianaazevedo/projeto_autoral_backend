import { UserAccount } from "@/protocols";
import { signUpService } from "@/services";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, imgUrl } = req.body as UserAccount
  try {
    const user = await signUpService.signUp(name, email, password, imgUrl);
    return res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    next(error);
  }
}


