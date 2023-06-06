import express, { Express } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB } from "@/config";
import { signInRouter, signUpRouter, themeRouter, favoriteRouter } from "@/routers";
import { handleApplicationErrors } from "./middlewares/errorMiddleware";

loadEnv();

const app = express();
app
.use(cors())
.use(express.json())
.use("/sign-up", signUpRouter)
.use("/sign-in", signInRouter)
.use("/theme", themeRouter)
.use("/favorite", favoriteRouter)
.use(handleApplicationErrors)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;