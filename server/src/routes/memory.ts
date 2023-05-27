import type { FastifyInstance } from "fastify";
import { prisma } from "~/lib/prisma";
import { idParamsValidationSchema } from "~/validation/id-params";
import { memoryValidationSchema } from "~/validation/memory";

interface MemoryPreview {
  id: string;
  coverUrl: string;
  excerpt: string;
}

const excerptMaxLength = 115;

export async function memoryRoutes(app: FastifyInstance) {
  app.get("/memories", async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      memories: memories.map(
        (memory): MemoryPreview => ({
          id: memory.id,
          coverUrl: memory.coverUrl,
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
    const memory = await prisma.memory.findUnique({
      where: { id },
    });

    if (!memory) {
      return response.status(404).send();
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
        userId: "e92deb54-2ae5-416b-9e74-7eb4d5198e40",
      },
    });

    return {
      memory: newMemory,
    };
  });

  app.put("/memories/:id", async request => {
    const { id } = idParamsValidationSchema.parse(request.params);
    const updateMemoryData = memoryValidationSchema.parse(request.body);

    const memory = await prisma.memory.update({
      where: { id },
      data: {
        ...updateMemoryData,
        userId: "e92deb54-2ae5-416b-9e74-7eb4d5198e40",
      },
    });

    return {
      memory,
    };
  });

  app.delete("/memories/:id", async (request, response) => {
    const { id } = idParamsValidationSchema.parse(request.params);

    await prisma.memory.delete({
      where: { id },
    });

    return response.status(204).send();
  });
}
