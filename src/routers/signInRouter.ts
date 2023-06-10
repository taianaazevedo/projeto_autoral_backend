import { signIn } from "@/controllers";
import { validate } from "@/middlewares";
import { signInSchema } from "@/schemas";
import { Router } from "express";

const signInRouter = Router();

signInRouter.post("/", validate(signInSchema), signIn);

export { signInRouter };
