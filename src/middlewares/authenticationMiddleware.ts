import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { unauthorizedError } from "@/errors";
import httpStatus from "http-status";

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw unauthorizedError();

    const parts = authorization.split(" ");
    if (parts.length !== 2) throw unauthorizedError();

    const [schema, token] = parts;
    if (schema !== "Bearer") throw unauthorizedError();

    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    if (!userId) throw unauthorizedError();

    req.userId = userId;

    next();
  } catch (error) {
    if (error.name === "unauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
    }
    next(error);
  }
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
