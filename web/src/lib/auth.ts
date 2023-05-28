import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME } from "~/constants";
import type { User } from "~/types/User";

export function getUser(): User {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    throw new Error("Unauthenticated");
  }

  return jwtDecode(accessToken);
}
