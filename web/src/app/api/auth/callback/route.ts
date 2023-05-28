import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE_NAME, REDIRECT_TO_COOKIE_NAME } from "~/constants";
import { api } from "~/lib/api";

interface RegisterResponse {
  accessToken: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { data } = await api.post<RegisterResponse>("/auth/register", { code });
  const cookieMaxAgeInSeconds = 60 * 60 * 24 * 7; // 7 days
  const redirectUrl =
    request.cookies.get(REDIRECT_TO_COOKIE_NAME)?.value ??
    new URL("/", request.url);

  return NextResponse.redirect(redirectUrl, {
    headers: {
      "Set-Cookie": `${ACCESS_TOKEN_COOKIE_NAME}=${data.accessToken}; Path=/; max-age=${cookieMaxAgeInSeconds}; HttpOnly`,
    },
  });
}
