import Link from "next/link";

interface EmptyMemoriesProps {}

export function EmptyMemories({}: EmptyMemoriesProps): JSX.Element | null {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="max-w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a{" "}
        <Link
          href="/memories/new"
          className="hover:text-app-gray-50 underline transition-colors"
        >
          criar agora
        </Link>
        !
      </p>
    </div>
  );
}
