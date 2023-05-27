import { User } from "lucide-react";
import { Logo } from "~/components/Logo";

export default function Home() {
  return (
    <main className="grid flex-1 grid-cols-2">
      {/* Left */}
      <div className="bg-stars relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-cover px-28 py-16">
        {/* Blur */}
        <div className="bg-app-purple-700 blur-full absolute right-0 top-1/2 h-[288px] w-[512px] -translate-y-1/2 translate-x-1/2 rounded-full opacity-50" />

        {/* Stripes */}
        <div className="bg-stripes absolute bottom-0 right-2 top-0 w-2" />

        {/* SignIn */}
        <a
          href="#"
          className="hover:text-app-gray-50 flex items-center gap-3 text-left transition-colors"
        >
          <div className="bg-app-gray-400 flex aspect-square w-10 items-center justify-center rounded-full">
            <User className="text-app-gray-500 h-5 w-5" />
          </div>

          <p className="max-w-[140px] text-sm leading-snug">
            <span className="underline">Crie sua conta</span> e salve suas
            memórias!
          </p>
        </a>

        {/* Hero */}
        <div className="flex flex-col items-start gap-5">
          <Logo aria-label="NLW Spacetime" />

          <div className="flex max-w-[420px] flex-col gap-4">
            <h1 className="text-app-gray-50 text-5xl font-bold leading-tight">
              Sua cápsula do tempo
            </h1>

            <p className="text-lg leading-relaxed">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </p>
          </div>

          <a
            href="#"
            className="bg-app-green-500 font-alt hover:bg-app-green-600 rounded-full px-5 py-3 text-sm uppercase leading-none text-black transition-colors"
          >
            Cadastrar Lembrança
          </a>
        </div>

        {/* Copyright */}
        <p className="text-app-gray-200 text-sm leading-relaxed">
          Feito com 💜 no NLW da{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://rocketseat.com.br"
            className="hover:text-app-gray-100 underline"
          >
            Rocketseat
          </a>
        </p>
      </div>

      {/* Right */}
      <div className="bg-stars flex flex-col bg-cover p-16">
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
      </div>
    </main>
  );
}
