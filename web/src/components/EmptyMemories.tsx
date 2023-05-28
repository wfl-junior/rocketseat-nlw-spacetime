interface EmptyMemoriesProps {}

export function EmptyMemories({}: EmptyMemoriesProps): JSX.Element | null {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="max-w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a{" "}
        <a
          href="#"
          className="hover:text-app-gray-50 underline transition-colors"
        >
          criar agora
        </a>
        !
      </p>
    </div>
  );
}
