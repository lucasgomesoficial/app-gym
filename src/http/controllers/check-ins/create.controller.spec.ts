import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { server } from "../../../server";
import { prisma } from "../../../lib/prisma";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(server);

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    const response = await request(server.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
