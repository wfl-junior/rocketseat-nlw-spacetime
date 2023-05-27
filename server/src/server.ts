import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

const app = fastify();
const prisma = new PrismaClient();

app.get("/users", async () => {
  return {
    users: await prisma.user.findMany(),
  };
});

app
  .listen({ port: 3333, host: "127.0.0.1" })
  .then(url => console.log(`Server running at ${url}`));
