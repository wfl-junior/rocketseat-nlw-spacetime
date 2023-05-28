import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE_NAME } from "~/constants";
import { api } from "~/lib/api";

interface RegisterResponse {
  accessToken: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectUrl = new URL("/", request.url);

  if (!code) {
    return NextResponse.redirect(redirectUrl);
  }

  const { data } = await api.post<RegisterResponse>("/auth/register", { code });

  const cookieMaxAgeInSeconds = 60 * 60 * 24 * 7; // 7 days

  return NextResponse.redirect(redirectUrl, {
    headers: {
      "Set-Cookie": `${ACCESS_TOKEN_COOKIE_NAME}=${data.accessToken}; Path=/; max-age=${cookieMaxAgeInSeconds}; HttpOnly`,
    },
  });
}
