import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { authenticate } from "./authenticate.controller";
import { profile } from "./profile.controller";
import { refreshToken } from "./refresh-token.controller";
import { register } from "./register.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.patch("/token/refresh", refreshToken);

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
