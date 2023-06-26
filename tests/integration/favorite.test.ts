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

    it("should return status 200 and favorite data", async () => {
      const token = await createToken();
      const user = await createUser();
      const theme = await createTheme(user.id);

      await server
        .post("/favorite")
        .set("Authorization", `Bearer ${token}`)
        .send({ theme_id: theme.id });

      const response = await server
        .get("/favorite")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: expect.any(Number),
          theme_id: expect.any(Number),
          user_id: expect.any(Number),
          createdAt: response.body[0].createdAt,
          updatedAt: response.body[0].updatedAt,
          Theme: {
            id: expect.any(Number),
            title: expect.any(String),
            user_id: expect.any(Number),
            createdAt: response.body[0].Theme.createdAt,
            updatedAt: response.body[0].Theme.updatedAt,
            User: {
              imgUrl: expect.any(String),
              name: expect.any(String),
            },
          },
        },
      ]);
    });
  });
});

describe("POST /theme", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/favorite");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 if theme_id is not a number", async () => {
      const token = await createToken();
      const word = faker.lorem.word();
      const response = await server
        .post("/favorite")
        .set("Authorization", `Bearer ${token}`)
        .send({ theme_id: word });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 if body is empty", async () => {
      const token = await createToken();
      const response = await server
        .post("/favorite")
        .set("Authorization", `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 201 and post a favorite", async () => {
      const token = await createToken();
      const user = await createUser();
      const theme = await createTheme(user.id);

      const response = await server
        .post("/favorite")
        .set("Authorization", `Bearer ${token}`)
        .send({ theme_id: theme.id });

      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});

describe("DELETE /favorite", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.delete("/favorite");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should return with 404 if id is not found", async () => {
      const token = await createToken();

      const response = await server
        .delete("/favorite/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should return with 400 if id is not a number", async () => {
      const token = await createToken();

      const response = await server
        .delete("/favorite/abc")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with 400 if id is less than 1", async () => {
      const token = await createToken();

      const response = await server
        .delete("/favorite/0")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("shloud retur status 200 when a theme is deleted", async () => {
      const token = await createToken();
      const user = await createUser();
      const theme = await createTheme(user.id);
      const favorite = await createFavorite(user.id, theme.id);

      const response = await server
        .delete(`/favorite/${favorite.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
