import Link from "next/link";
import { Logo } from "./Logo";

interface HeroProps {}

export function Hero({}: HeroProps): JSX.Element | null {
  return (
    <div className="flex flex-col items-start gap-5">
      <Logo aria-label="NLW Spacetime" />

      <div className="flex max-w-[420px] flex-col gap-4">
        <h1 className="text-app-gray-50 text-5xl font-bold leading-tight">
          Sua cápsula do tempo
        </h1>

        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <Link
        href="/memories/new"
        className="bg-app-green-500 font-alt hover:bg-app-green-600 rounded-full px-5 py-3 text-sm uppercase leading-none text-black transition-colors"
      >
        Cadastrar Lembrança
      </Link>
    </div>
  );
}
