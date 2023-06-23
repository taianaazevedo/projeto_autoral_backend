import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories";
import { cleanDb } from "../helpers";
import app, { init } from "@/app";
import { signInService } from "@/services";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /sign-in", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/sign-in");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/sign-in").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    });

    it("should respond with status 401 if there is no user for given email", async () => {
      const body = generateValidBody();

      const response = await server.post("/sign-in").send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
      await createUser();
      const body = generateValidBody();

      const response = await server.post("/sign-in").send({
        ...body,
        password: faker.lorem.word(),
      });

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when credentials are valid", () => {
      it("should respond with status 200", async () => {
        const body = generateValidBody();
        await createUser(body.email, body.password);

        const response = await server.post("/sign-in").send(body);

        expect(response.status).toBe(httpStatus.OK);
      });

      it("should respond with user data", async () => {
        const body = generateValidBody();
        const user = await createUser(body.email, body.password);

        const response = await server.post("/sign-in").send(body);

        expect(response.body).toEqual({
          id: user.id,
          imgUrl: user.imgUrl,
          name: user.name,
          token: response.body.token,
        });
      });

      it("should respond with token", async () => {
        const body = generateValidBody();
        await createUser(body.email, body.password);

        const response = await server.post("/sign-in").send(body);

        expect(response.body.token).toBeDefined();
      });
    });
  });
});
