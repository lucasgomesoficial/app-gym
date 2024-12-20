import { env } from "../env";
import { server } from "./server";

server
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("🚀 HTTP Server Running!");
  });
