import { cookies } from "next/headers";
import { Copyright } from "~/components/Copyright";
import { EmptyMemories } from "~/components/EmptyMemories";
import { Hero } from "~/components/Hero";
import { Profile } from "~/components/Profile";
import { SignIn } from "~/components/SignIn";
import { ACCESS_TOKEN_COOKIE_NAME } from "~/constants";

interface HomeProps {}

function Home({}: HomeProps): JSX.Element | null {
  const isAuthenticated = cookies().has(ACCESS_TOKEN_COOKIE_NAME);

  return (
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
      <div className="bg-stars flex flex-col bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  );
}

export default Home;
