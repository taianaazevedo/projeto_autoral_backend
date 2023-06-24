import httpStatus from "http-status";
import supertest from "supertest";
import { createToken, createUser } from "../factories";
import { cleanDb } from "../helpers";
import app, { init } from "@/app";
import { createTheme } from "../factories/themeFactory";
import { createSong } from "../factories/referencesFactory";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /song", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/song");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should return with status 400 if title is missing", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const performer = faker.person.firstName();

      const response = await server
        .post("/song")
        .set("Authorization", `Bearer ${token}`)
        .send({ performer, theme_id: theme.id });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with status 400 if performer is missing", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const title = faker.lorem.word(3);

      const response = await server
        .post("/song")
        .set("Authorization", `Bearer ${token}`)
        .send({ title, theme_id: theme.id });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with status 400 if theme_id is missing", async () => {
      const token = await createToken();
      const title = faker.lorem.word(3);
      const performer = faker.person.firstName();

      const response = await server
        .post("/song")
        .set("Authorization", `Bearer ${token}`)
        .send({ title, performer });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 201 and with theme data", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const title = faker.lorem.word(3);
      const performer = faker.person.firstName();

      const response = await server
        .post("/song")
        .set("Authorization", `Bearer ${token}`)
        .send({ title, performer, theme_id: theme.id });

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        title: expect.any(String),
        performer: expect.any(String),
        theme_id: expect.any(Number),
        user_id: expect.any(Number),
        createdAt: response.body.createdAt,
        updatedAt: response.body.updatedAt,
      });
    });
  });
});

describe("PATCH /song", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.patch("/song");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should return with status 400 if title is missing", async () => {
    const user = await createUser();
    const token = await createToken();
    const theme = await createTheme(user.id);
    const performer = faker.person.firstName();

    const response = await server
      .patch("/song")
      .set("Authorization", `Bearer ${token}`)
      .send({ performer, theme_id: theme.id });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return with status 400 if performer is missing", async () => {
    const user = await createUser();
    const token = await createToken();
    const theme = await createTheme(user.id);
    const title = faker.lorem.word(3);

    const response = await server
      .patch("/song")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, theme_id: theme.id });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return with status 400 if id is missing", async () => {
    const token = await createToken();
    const title = faker.lorem.word(3);
    const performer = faker.person.firstName();

    const response = await server
      .patch("/song")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, performer });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return status 404 if id is not found", async () => {
    const user = await createUser();
    const token = await createToken();
    const title = faker.lorem.word(3);
    const performer = faker.person.firstName();
    const idFake = faker.number.int(10);
    const theme = await createTheme(user.id);
   await createSong(user.id, theme.id)

    const response = await server
      .patch("/song")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, performer, id: idFake });

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 201 and with theme data", async () => {
    const user = await createUser();
    const token = await createToken();
    const theme = await createTheme(user.id);
    const song = await createSong(user.id, theme.id);
    const title = faker.lorem.word(3);
    const performer = faker.person.firstName();

    const response = await server
      .patch("/song")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, performer, id: song.id });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      performer: expect.any(String),
      theme_id: expect.any(Number),
      user_id: expect.any(Number),
      createdAt: response.body.createdAt,
      updatedAt: response.body.updatedAt,
    });
  });
});
