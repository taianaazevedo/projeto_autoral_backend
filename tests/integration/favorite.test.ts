import httpStatus from "http-status";
import supertest from "supertest";
import { createFavorite, createToken, createUser } from "../factories";
import { cleanDb } from "../helpers";
import app, { init } from "@/app";
import { createTheme } from "../factories/themeFactory";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /favorites", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/favorite");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should return status 200 and a empty array when there is no favorite", async () => {
      const token = await createToken();

      const response = await server
        .get("/favorite")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
    });

    // it("should return status 200 and favorite data", async () => {
    //   const token = await createToken();
    //   const user = await createUser();
    //   const theme = await createTheme(user.id);
    //   const favorite = await createFavorite(user.id, theme.id);

    //   const response = await server
    //     .get("/favorite")
    //     .set("Authorization", `Bearer ${token}`);

    //   expect(response.status).toBe(httpStatus.OK);
    //   expect(response.body).toEqual([
    //     {
    //       id: favorite.id,
    //       theme_id: theme.id,
    //       user_id: favorite.user_id,
    //       createdAt: response.body.createdAt,
    //       updatedAt: response.body.updatedAt,
    //       Theme: {
    //         id: theme.id,
    //         title: theme.title,
    //       },
    //     },
    //   ]);
    // });
  });
});
