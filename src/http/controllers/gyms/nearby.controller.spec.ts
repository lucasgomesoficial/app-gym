import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { server } from "../../../server";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(server, true);

    await request(server.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some description.",
        phone: "1199999999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    await request(server.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "Some description.",
        phone: "1199999999",
        latitude: -27.0610928,
        longitude: -49.5229501,
      });

    const response = await request(server.server)
      .get("/gyms/nearby")
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "JavaScript Gym",
      }),
    ]);
  });
});
