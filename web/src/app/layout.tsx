import classNames from "classnames";
import { Bai_Jamjuree, Roboto_Flex } from "next/font/google";
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
  return (
    <html lang="pt-br" dir="ltr">
      <body
        className={classNames(
          "text-app-gray-100 bg-app-gray-900 flex min-h-screen flex-col font-sans",
          roboto.variable,
          baiJamjuree.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
