import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  LOGIN_URL,
  REDIRECT_TO_COOKIE_NAME,
} from "./constants";

export const config = {
  matcher: "/memories/:path*",
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return NextResponse.redirect(LOGIN_URL, {
      headers: {
        "Set-Cookie": `${REDIRECT_TO_COOKIE_NAME}=${request.url}; Path=/; HttpOnly`,
      },
    });
  }

  return NextResponse.next();
}
