import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { server } from "../../../server";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to get user Profile", async () => {
    const { token } = await createAndAuthenticateUser(server);

    const profileResponse = await request(server.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      })
    );
  });
});
