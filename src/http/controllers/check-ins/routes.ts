import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { create } from "./create.controller";
import { history } from "./history.controller";
import { metrics } from "./metrics.controller";
import { validate } from "./validate.controller";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/check-ins", create);
  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate
  );
}
