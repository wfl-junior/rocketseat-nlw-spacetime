import "dotenv/config";

import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import { Prisma } from "@prisma/client";
import fastify from "fastify";
import { resolve } from "node:path";
import { ZodError } from "zod";
import { authRoutes } from "./routes/auth";
import { memoryRoutes } from "./routes/memory";
import { uploadRoutes } from "./routes/upload";

const app = fastify({ logger: true });

app.register(fastifyMultipart);
app.register(fastifyJwt, { secret: process.env.JWT_SECRET });
app.register(fastifyCors, { origin: "http://localhost:3000" });
app.register(fastifyStatic, {
  prefix: "/uploads",
  root: resolve(__dirname, "..", "uploads"),
});

app.setErrorHandler(async (error, _request, response) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      // unique constraint failed
      return response.status(409).send({ message: error.message });
    }

    if (error.code === "P2003") {
      // foreign key failed
      return response.status(400).send({ message: error.message });
    }

    if (error.code === "P2025") {
      // not found
      return response.status(404).send({ message: "Record not found" });
    }
  }

  if (error instanceof ZodError) {
    return response.status(422).send({
      errors: error.errors.reduce<Record<string, string>>((errors, error) => {
        errors[String(error.path)] = error.message;
        return errors;
      }, {}),
    });
  }

  if (error.statusCode === 401) {
    return response.status(401).send({ message: error.message });
  }

  console.error(error);
  return response.status(500).send({ message: "Houston, we have a problem!" });
});

app.register(authRoutes);
app.register(uploadRoutes);
app.register(memoryRoutes);

app.listen({ port: 3333, host: "0.0.0.0" });
