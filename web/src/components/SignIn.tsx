import { User } from "lucide-react";
import { LOGIN_URL } from "~/constants";

interface SignInProps {}

export function SignIn({}: SignInProps): JSX.Element | null {
  return (
    <a
      href={LOGIN_URL}
      className="hover:text-app-gray-50 flex items-center gap-3 text-left transition-colors"
    >
      <div className="bg-app-gray-400 flex aspect-square w-10 items-center justify-center rounded-full">
        <User className="text-app-gray-500 h-5 w-5" />
      </div>

      <p className="max-w-[140px] text-sm leading-snug">
        <span className="underline">Crie sua conta</span> e salve suas memórias!
      </p>
    </a>
  );
}
