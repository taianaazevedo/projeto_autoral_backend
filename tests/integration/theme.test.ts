import httpStatus from "http-status";
import supertest from "supertest";
import { createToken, createUser } from "../factories";
import { cleanDb } from "../helpers";
import app, { init } from "@/app";
import { createTheme } from "../factories/themeFactory";
import {
  createBook,
  createSerie,
  createMovie,
  createSong,
} from "../factories/referencesFactory";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});


const server = supertest(app);

describe("GET /theme/allthemes", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/theme/allthemes");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and a empty array when there is no themes", async () => {
      await createUser();
      const token = await createToken();

      const response = await server
        .get("/theme/allthemes")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

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
            imgUrl: user.imgUrl,
          },
        },
      ]);
    });
  });
});

describe("GET /theme/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/theme/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should return with 404 if id is not found", async () => {
      const token = await createToken();

      const response = await server
        .get("/theme/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should return with 400 if id is not a number", async () => {
      const token = await createToken();

      const response = await server
        .get("/theme/abc")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with 400 if id is less than 1", async () => {
      const token = await createToken();

      const response = await server
        .get("/theme/0")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with status 200 and theme data", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const song = await createSong(user.id, theme.id);
      const movie = await createMovie(user.id, theme.id);
      const serie = await createSerie(user.id, theme.id);
      const book = await createBook(user.id, theme.id);

      const response = await server
        .get(`/theme/${theme.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: theme.id,
        title: theme.title,
        user_id: theme.user_id,
        createdAt: theme.createdAt.toISOString(),
        updatedAt: theme.updatedAt.toISOString(),
        User: {
          name: user.name,
        },
        Song: [
          {
            id: song.id,
            title: song.title,
            performer: song.performer,
          },
        ],
        Movie: [
          {
            id: movie.id,
            title: movie.title,
            streaming: movie.streaming,
          },
        ],
        Serie: [
          {
            id: serie.id,
            title: serie.title,
            streaming: serie.streaming,
          },
        ],
        Book: [
          {
            id: book.id,
            title: book.title,
            author: book.author,
          },
        ],
      });
    });
  });
});

describe("GET /theme?search=", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/theme?search=word");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should return with status 200 and a empty array when there is no theme with a given word", async () => {
      const token = await createToken();
      const word = faker.lorem.word()

      const response = await server
        .get(`/theme?search=${word}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it("should return with status 200 and theme", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const word = theme.title.split(" ")[0];

      const response = await server
        .get(`/theme?search=${word}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body[0].title).toContain(`${word}`);
    });
  });
});

describe("GET /theme/mythemes", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/theme/mythemes");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with 200 and a empty array when there is no theme", async () => {
      const token = await createToken();
    
      const response = await server
        .get("/theme/mythemes")
        .set("Authorization", `Bearer ${token}`);


      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it("should respond with 200 and themes created by user", async () => {
      const token = await createToken();
      const title = faker.lorem.words(5)

     const post =  await server
        .post("/theme")
        .set("Authorization", `Bearer ${token}`)
        .send({ title });

      const response = await server
        .get("/theme/mythemes")
        .set("Authorization", `Bearer ${token}`);


      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: post.body.id,
          title: post.body.title,
          user_id: post.body.user_id,
          createdAt: post.body.createdAt,
          updatedAt: post.body.updatedAt,
        },
      ]);
    });
  });
});

describe("POST /theme", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/theme");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should return with status 400 if body is empty", async () => {
      const token = await createToken();

      const response = await server
        .post("/theme")
        .set("Authorization", `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with status 409 if theme's title already exist", async () => {
      const user = await createUser();
      const token = await createToken();
      const title = faker.lorem.words(5);
      const theme = await createTheme(user.id, title);

      const response = await server
        .post("/theme")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: theme.title });

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should return status 201, create a theme and return theme data", async () => {
      await createUser();
      const token = await createToken();
      const title = faker.lorem.words(5);

      const response = await server
        .post("/theme")
        .set("Authorization", `Bearer ${token}`)
        .send({ title });

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        title: response.body.title,
        user_id: expect.any(Number),
        createdAt: response.body.createdAt,
        updatedAt: response.body.updatedAt,
      });
    });
  });
});

describe("PATCH /theme/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.patch("/theme/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should return with 404 if id is not found", async () => {
      const token = await createToken();
      const title = faker.lorem.words(5);

      const response = await server
        .patch("/theme/1")
        .set("Authorization", `Bearer ${token}`)
        .send({ title });

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should return with 400 if id is not a number", async () => {
      const token = await createToken();
      const title = faker.lorem.words(5);

      const response = await server
        .patch("/theme/abc")
        .set("Authorization", `Bearer ${token}`)
        .send({ title });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with 400 if id is less than 1", async () => {
      const token = await createToken();
      const title = faker.lorem.words(5);

      const response = await server
        .patch("/theme/0")
        .set("Authorization", `Bearer ${token}`)
        .send({ title });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with status 400 if body is empty", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);

      const response = await server
        .patch(`/theme/${theme.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with status 409 if theme's title already exist", async () => {
      const user = await createUser();
      const token = await createToken();
      const title = faker.lorem.words(5);
      const theme = await createTheme(user.id, title);

      const response = await server
        .patch(`/theme/${theme.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ title: theme.title });

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should be return status 200 and theme updated", async () => {
      const user = await createUser();
      const token = await createToken();
      const theme = await createTheme(user.id);
      const title = faker.lorem.words(5);

      const response = await server
        .patch(`/theme/${theme.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ title });

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: theme.id,
        title,
        user_id: theme.user_id,
        createdAt: theme.createdAt.toISOString(),
        updatedAt: response.body.updatedAt,
      });
    });
  });
});

describe("DELETE /theme/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.delete("/theme/1");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should return with 404 if id is not found", async () => {
      const token = await createToken();

      const response = await server
        .delete("/theme/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should return with 400 if id is not a number", async () => {
      const token = await createToken();

      const response = await server
        .delete("/theme/abc")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return with 400 if id is less than 1", async () => {
      const token = await createToken();

      const response = await server
        .delete("/theme/0")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("shloud retur status 200 when a theme is deleted", async () => {
      const token = await createToken();
      const user = await createUser();
      const theme = await createTheme(user.id);

      const response = await server
        .delete(`/theme/${theme.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
