import { signUp } from "@/controllers";
import { validate } from "@/middlewares";
import { signUpSchema } from "@/schemas";
import { Router } from "express";

const signUpRouter = Router();

signUpRouter.post("/", validate(signUpSchema), signUp);

export { signUpRouter };
