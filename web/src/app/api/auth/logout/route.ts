import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE_NAME } from "~/constants";

export async function GET(request: NextRequest) {
  const redirectUrl = new URL("/", request.url);

  return NextResponse.redirect(redirectUrl, {
    headers: {
      "Set-Cookie": `${ACCESS_TOKEN_COOKIE_NAME}=; Path=/; max-age=0; HttpOnly`,
    },
  });
}
