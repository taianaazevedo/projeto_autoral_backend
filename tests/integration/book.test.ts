import httpStatus from "http-status";
import supertest from "supertest";
import { createToken, createUser } from "../factories";
import { cleanDb } from "../helpers";
import app, { init } from "@/app";
import { createTheme } from "../factories/themeFactory";
import { createBook } from "../factories/referencesFactory";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});


const server = supertest(app);

describe("POST /book", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/book");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should return with status 400 if title is missing", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const author = faker.person.fullName();

      const response = await server
        .post("/book")
        .set("Authorization", `Bearer ${token}`)
        .send({ author, theme_id: theme.id });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with status 400 if author is missing", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const title = faker.lorem.word(3);

      const response = await server
        .post("/book")
        .set("Authorization", `Bearer ${token}`)
        .send({ title, theme_id: theme.id });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with status 400 if theme_id is missing", async () => {
      const token = await createToken();
      const title = faker.lorem.word(3);
      const author = faker.person.fullName();

      const response = await server
        .post("/book")
        .set("Authorization", `Bearer ${token}`)
        .send({ title, author });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 201 and with book data", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const title = faker.lorem.word(3);
      const author = faker.person.fullName();

      const response = await server
        .post("/book")
        .set("Authorization", `Bearer ${token}`)
        .send({ title, author, theme_id: theme.id });

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        title: expect.any(String),
        author: expect.any(String),
        theme_id: expect.any(Number),
        user_id: expect.any(Number),
        createdAt: response.body.createdAt,
        updatedAt: response.body.updatedAt,
      });
    });
  });
});

describe("PATCH /book", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.patch("/book");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should return with status 400 if title is missing", async () => {
    const user = await createUser();
    const token = await createToken();
    const theme = await createTheme(user.id);
    const author = faker.person.fullName();

    const response = await server
      .patch("/book")
      .set("Authorization", `Bearer ${token}`)
      .send({ author, theme_id: theme.id });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return with status 400 if author is missing", async () => {
    const user = await createUser();
    const token = await createToken();
    const theme = await createTheme(user.id);
    const title = faker.lorem.word(3);

    const response = await server
      .patch("/book")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, theme_id: theme.id });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return with status 400 if id is missing", async () => {
    const token = await createToken();
    const title = faker.lorem.word(3);
    const author = faker.person.fullName();

    const response = await server
      .patch("/book")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, author });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return status 404 if id is not found", async () => {
    const user = await createUser();
    const token = await createToken();
    const title = faker.lorem.word(3);
    const author = faker.person.fullName();
    const idFake = 5;
     await createTheme(user.id);
    

    const response = await server
      .patch("/book")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, author, id: idFake });

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 201 and with book data", async () => {
    const user = await createUser();
    const token = await createToken();
    const theme = await createTheme(user.id);
    const book = await createBook(user.id, theme.id);
    const title = faker.lorem.word(3);
    const author = faker.person.fullName();

    const response = await server
      .patch("/book")
      .set("Authorization", `Bearer ${token}`)
      .send({ title, author, id: book.id });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      author: expect.any(String),
      theme_id: expect.any(Number),
      user_id: expect.any(Number),
      createdAt: response.body.createdAt,
      updatedAt: response.body.updatedAt,
    });
  });
});
