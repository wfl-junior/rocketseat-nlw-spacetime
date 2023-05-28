import Image from "next/image";
import { getUser } from "~/lib/auth";

interface ProfileProps {}

export function Profile({}: ProfileProps): JSX.Element | null {
  const { name, avatarUrl } = getUser();

  return (
    <div className="flex items-center gap-3 text-left">
      <picture className="bg-app-gray-400 flex aspect-square w-10 items-center justify-center overflow-hidden rounded-full">
        <Image
          alt={name}
          width={80}
          height={80}
          quality={100}
          src={avatarUrl}
        />
      </picture>

      <div className="flex flex-col text-sm leading-snug">
        <span>{name}</span>

        <a
          href="/api/auth/logout"
          className="text-red-400 transition-colors hover:text-red-300"
        >
          Quero sair
        </a>
      </div>
    </div>
  );
}
