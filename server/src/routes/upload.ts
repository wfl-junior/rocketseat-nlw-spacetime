import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { extname, resolve } from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pump = promisify(pipeline);

export async function uploadRoutes(app: FastifyInstance) {
  app.post("/upload", async (request, response) => {
    await request.jwtVerify();

    const upload = await request.file({
      limits: {
        fieldSize: 1024 ** 2 * 200, // 200MiB
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

    const uploadDirectory = resolve(__dirname, "..", "..", "uploads");

    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    const writeStream = fs.createWriteStream(
      resolve(uploadDirectory, fileName),
    );

    await pump(upload.file, writeStream);

    return {
      fileUrl: `/uploads/${fileName}`,
    };
  });
}
