import httpStatus from "http-status";
import supertest from "supertest";
import { createToken, createUser } from "../factories";
import { cleanDb } from "../helpers";
import app, { init } from "@/app";
import { createTheme } from "../factories/themeFactory";
import { createSerie } from "../factories/referencesFactory";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});


const server = supertest(app);

describe("POST /", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/serie");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should return with status 400 if title is missing", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const streaming = faker.lorem.word();

      const response = await server
        .post("/serie")
        .set("Authorization", `Bearer ${token}`)
        .send({ streaming, theme_id: theme.id });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with status 400 if streaming is missing", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const title = faker.lorem.word(3);

      const response = await server
        .post("/serie")
        .set("Authorization", `Bearer ${token}`)
        .send({ title, theme_id: theme.id });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with status 400 if theme_id is missing", async () => {
      const token = await createToken();
      const title = faker.lorem.word(3);
      const streaming = faker.lorem.word();

      const response = await server
        .post("/serie")
        .set("Authorization", `Bearer ${token}`)
        .send({ title, streaming });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 201 and with serie data", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const title = faker.lorem.word(3);
      const streaming = faker.lorem.word();

      const response = await server
        .post("/serie")
        .set("Authorization", `Bearer ${token}`)
        .send({ title, streaming, theme_id: theme.id });

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        title: expect.any(String),
        streaming: expect.any(String),
        theme_id: expect.any(Number),
        user_id: expect.any(Number),
        createdAt: response.body.createdAt,
        updatedAt: response.body.updatedAt,
      });
    });
  });
});

describe("PATCH /serie", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.patch("/serie");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should return with status 400 if title is missing", async () => {
    const user = await createUser();
    const token = await createToken();
    const theme = await createTheme(user.id);
    const streaming = faker.lorem.word();

    const response = await server
      .patch("/serie")
      .set("Authorization", `Bearer ${token}`)
      .send({ streaming, theme_id: theme.id });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return with status 400 if streaming is missing", async () => {
    const user = await createUser();
    const token = await createToken();
    const theme = await createTheme(user.id);
    const title = faker.lorem.word(3);

    const response = await server
      .patch("/serie")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, theme_id: theme.id });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return with status 400 if id is missing", async () => {
    const token = await createToken();
    const title = faker.lorem.word(3);
    const streaming = faker.lorem.word();

    const response = await server
      .patch("/serie")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, streaming });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return status 404 if id is not found", async () => {
    const user = await createUser();
    const token = await createToken();
    const title = faker.lorem.word(3);
    const streaming = faker.lorem.word();
    const idFake = 5;
     await createTheme(user.id);
    

    const response = await server
      .patch("/serie")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, streaming, id: idFake });

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 201 and with serie data", async () => {
    const user = await createUser();
    const token = await createToken();
    const theme = await createTheme(user.id);
    const serie = await createSerie(user.id, theme.id);
    const title = faker.lorem.word(3);
    const streaming = faker.lorem.word();

    const response = await server
      .patch("/serie")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, streaming, id: serie.id });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      streaming: expect.any(String),
      theme_id: expect.any(Number),
      user_id: expect.any(Number),
      createdAt: response.body.createdAt,
      updatedAt: response.body.updatedAt,
    });
  });
});
