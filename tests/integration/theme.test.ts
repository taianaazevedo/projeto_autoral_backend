import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createToken, createUser } from "../factories";
import { cleanDb } from "../helpers";
import { prisma } from "@/config";
import app, { init } from "@/app";
import { createTheme } from "../factories/themeFactory";
import { title } from "process";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /theme/allthemes", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/theme/allthemes");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    await createUser();
    await createToken();

    const token = faker.lorem.word();

    const response = await server
      .get("/theme/allthemes")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and with theme data", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);

      const response = await server
        .get("/theme/allthemes")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: theme.id,
          title: theme.title,
          user_id: theme.user_id,
          createdAt: theme.createdAt.toISOString(),
          updatedAt: theme.updatedAt.toISOString(),
          User: {
            name: user.name,
            imgUrl: user.imgUrl
          }
        },
      ]);
    });
  });
});
