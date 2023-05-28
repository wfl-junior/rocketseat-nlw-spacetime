import axios from "axios";
import type { FastifyInstance } from "fastify";
import { prisma } from "~/lib/prisma";
import { githubUserValidationSchema } from "~/validation/github-user";
import { registerValidationSchema } from "~/validation/register";

interface AccessTokenResponse {
  access_token: string;
}

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/register", async request => {
    const { code } = registerValidationSchema.parse(request.body);

    const accessTokenResponse = await axios.post<AccessTokenResponse>(
      "https://github.com/login/oauth/access_token",
      undefined,
      {
        params: {
          code,
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
        },
        headers: {
          Accept: "application/json",
        },
      },
    );

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessTokenResponse.data.access_token}`,
      },
    });

    const userInfo = githubUserValidationSchema.parse(userResponse.data);

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: userInfo.name,
          githubId: userInfo.id,
          login: userInfo.login,
          avatarUrl: userInfo.avatar_url,
        },
      });
    }

    const accessToken = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: "7 days",
      },
    );

    return {
      accessToken,
    };
  });
}
