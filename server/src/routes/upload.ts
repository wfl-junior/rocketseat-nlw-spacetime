import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";
import { extname, resolve } from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pump = promisify(pipeline);

export async function uploadRoutes(app: FastifyInstance) {
  app.post("/upload", async (request, response) => {
    const upload = await request.file({
      limits: {
        fieldSize: Math.pow(1024, 2) * 5, // 5MiB
      },
    });

    if (!upload) {
      return response.status(400).send({ message: "A file is required" });
    }

    const mimeTypeRegex = /^(image|video)/;

    if (!mimeTypeRegex.test(upload.mimetype)) {
      return response
        .status(400)
        .send({ message: "Only image and video files are supported" });
    }

    const fileId = randomUUID();
    const extension = extname(upload.filename);
    const fileName = fileId.concat(extension);

    const writeStream = createWriteStream(
      resolve(__dirname, "..", "..", "uploads", fileName),
    );

    await pump(upload.file, writeStream);

    const fullUrl = request.protocol.concat("://").concat(request.hostname);
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();

    return {
      fileUrl,
    };
  });
}
