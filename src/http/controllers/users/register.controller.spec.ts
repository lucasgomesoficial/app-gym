import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { server } from "../../../server";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to register", async () => {
    const response = await request(server.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
