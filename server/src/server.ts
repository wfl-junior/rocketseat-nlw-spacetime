import cors from "@fastify/cors";
import { Prisma } from "@prisma/client";
import fastify from "fastify";
import { ZodError } from "zod";
import { memoryRoutes } from "./routes/memory";

const app = fastify({ logger: true });
app.register(cors, { origin: "http://localhost:3000" });

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

  console.error(error);
  return response.status(500).send({ message: "Houston, we have a problem!" });
});

app.register(memoryRoutes);

app.listen({ port: 3333, host: "0.0.0.0" });
