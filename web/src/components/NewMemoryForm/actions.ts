"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN_COOKIE_NAME } from "~/constants";
import { api } from "~/lib/api";

export async function createMemory(formData: FormData) {
  let coverUrl = "";
  const fileToUpload = formData.get("file");
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (fileToUpload) {
    const uploadFormData = new FormData();
    uploadFormData.set("file", fileToUpload);
    const { data } = await api.post<{ fileUrl: string }>(
      "/upload",
      uploadFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    coverUrl = data.fileUrl;
  }

  await api.post(
    "/memories",
    {
      coverUrl,
      content: formData.get("content"),
      isPublic: formData.get("isPublic"),
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  redirect("/");
}
