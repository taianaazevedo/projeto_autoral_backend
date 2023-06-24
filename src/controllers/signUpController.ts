import { UserAccount } from "@/protocols";
import { signUpService } from "@/services";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const { name, email, password, imgUrl } = req.body as UserAccount;
  if (
    !name ||
    !email ||
    !password ||
    !imgUrl ||
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof imgUrl !== "string"
  ) return res.sendStatus(httpStatus.BAD_REQUEST)
    try {
      const user = await signUpService.signUp(name, email, password, imgUrl);
      return res
        .status(httpStatus.CREATED)
        .json({
          id: user.id,
          name: user.name,
          imgUrl: user.imgUrl,
          email: user.email,
        });
    } catch (error) {
      next(error);
    }
}
