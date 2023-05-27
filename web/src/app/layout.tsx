import classNames from "classnames";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "NLW Spacetime",
  description: "Sua cápsula do tempo.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br" dir="ltr">
      <body
        className={classNames(
          "flex min-h-screen flex-col items-center justify-center bg-zinc-900 text-zinc-100",
          roboto.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
