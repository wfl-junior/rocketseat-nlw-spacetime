import type { FastifyInstance } from "fastify";
import { prisma } from "~/lib/prisma";
import { idParamsValidationSchema } from "~/validation/id-params";
import { memoryValidationSchema } from "~/validation/memory";

interface MemoryPreview {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: Date;
}

const excerptMaxLength = 115;

export async function memoryRoutes(app: FastifyInstance) {
  app.addHook("preHandler", request => request.jwtVerify());

  app.get("/memories", async request => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        userId: request.user.sub,
      },
    });

    return {
      memories: memories.map(
        (memory): MemoryPreview => ({
          id: memory.id,
          coverUrl: memory.coverUrl,
          createdAt: memory.createdAt,
          excerpt:
            memory.content.length > excerptMaxLength
              ? memory.content.substring(0, excerptMaxLength).concat("...")
              : memory.content,
        }),
      ),
    };
  });

  app.get("/memories/:id", async (request, response) => {
    const { id } = idParamsValidationSchema.parse(request.params);
    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return response
        .status(403)
        .send({ message: "Only the owner can access this memory" });
    }

    return {
      memory,
    };
  });

  app.post("/memories", async request => {
    const newMemoryData = memoryValidationSchema.parse(request.body);
    const newMemory = await prisma.memory.create({
      data: {
        ...newMemoryData,
        userId: request.user.sub,
      },
    });

    return {
      memory: newMemory,
    };
  });

  app.put("/memories/:id", async (request, response) => {
    const { id } = idParamsValidationSchema.parse(request.params);
    const updateMemoryData = memoryValidationSchema.parse(request.body);

    let memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    if (memory.userId !== request.user.sub) {
      return response
        .status(403)
        .send({ message: "Only the owner can update this memory" });
    }

    memory = await prisma.memory.update({
      where: { id },
      data: updateMemoryData,
    });

    return {
      memory,
    };
  });

  app.delete("/memories/:id", async (request, response) => {
    const { id } = idParamsValidationSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    if (memory.userId !== request.user.sub) {
      return response
        .status(403)
        .send({ message: "Only the owner can update this memory" });
    }

    await prisma.memory.delete({
      where: { id },
    });

    return response.status(204).send();
  });
}
