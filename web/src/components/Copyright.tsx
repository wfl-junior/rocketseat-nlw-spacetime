interface CopyrightProps {}

export function Copyright({}: CopyrightProps): JSX.Element | null {
  return (
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
  );
}
