import classNames from "classnames";
import { Bai_Jamjuree, Roboto_Flex } from "next/font/google";
import { cookies } from "next/headers";
import { Copyright } from "~/components/Copyright";
import { Hero } from "~/components/Hero";
import { Profile } from "~/components/Profile";
import { SignIn } from "~/components/SignIn";
import { ACCESS_TOKEN_COOKIE_NAME } from "~/constants";
import "./globals.css";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const baiJamjuree = Bai_Jamjuree({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "NLW Spacetime",
  description: "Sua cápsula do tempo.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps): JSX.Element | null {
  const isAuthenticated = cookies().has(ACCESS_TOKEN_COOKIE_NAME);

  return (
    <html lang="pt-br" dir="ltr">
      <body
        className={classNames(
          "text-app-gray-100 bg-app-gray-900 flex min-h-screen flex-col font-sans",
          roboto.variable,
          baiJamjuree.variable,
        )}
      >
        <main className="grid flex-1 grid-cols-2">
          {/* Left */}
          <div className="bg-stars relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-cover px-28 py-16">
            {/* Blur */}
            <div className="bg-app-purple-700 blur-full absolute right-0 top-1/2 h-[288px] w-[512px] -translate-y-1/2 translate-x-1/2 rounded-full opacity-50" />

            {/* Stripes */}
            <div className="bg-stripes absolute bottom-0 right-2 top-0 w-2" />

            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>

          {/* Right */}
          <div className="bg-stars flex flex-col bg-cover p-16">{children}</div>
        </main>
      </body>
    </html>
  );
}

export default RootLayout;
