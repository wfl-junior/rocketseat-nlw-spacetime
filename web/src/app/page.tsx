import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { EmptyMemories } from "~/components/EmptyMemories";
import { ACCESS_TOKEN_COOKIE_NAME, BACKEND_URL } from "~/constants";
import { api } from "~/lib/api";

interface MemoryPreview {
  id: string;
  excerpt: string;
  coverUrl: string;
  createdAt: string;
}

interface HomeProps {}

async function Home({}: HomeProps): Promise<JSX.Element | null> {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return <EmptyMemories />;
  }

  const {
    data: { memories },
  } = await api.get<{ memories: MemoryPreview[] }>("/memories", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (memories.length === 0) {
    return <EmptyMemories />;
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map(memory => (
        <div key={memory.id} className="flex flex-col gap-4">
          <time
            dateTime={memory.createdAt}
            className="text-app-gray-100 before:bg-app-gray-50 -ml-8 flex items-center gap-2 text-sm before:h-px before:w-5"
          >
            {dayjs(memory.createdAt).format("DD[ de ]MMMM[, ]YYYY")}
          </time>

          <picture className="relative aspect-video w-full ">
            <Image
              fill
              alt=""
              src={BACKEND_URL.concat(memory.coverUrl)}
              className="rounded-lg object-cover"
            />
          </picture>

          <p className="text-app-gray-100 text-lg leading-relaxed">
            {memory.excerpt}
          </p>

          <Link
            href={`/memories/${memory.id}`}
            className="text-app-gray-200 hover:text-app-gray-100 flex items-center gap-2 text-sm transition-colors"
          >
            Ler mais
            <ArrowRight className="aspect-square w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
