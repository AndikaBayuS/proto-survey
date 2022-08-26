import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavigationItem = [
  { name: "Surveys", href: "/" },
  { name: "Leaderboard", href: "/leaderboard" },
];

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={"/"}>
            <p className="cursor-pointer text-2xl font-semibold">
              <span className="text-blue-600">Proto</span>Survey
            </p>
          </Link>

          {status === "authenticated" ? (
            <div className="flex items-center space-x-5">
              {NavigationItem.map((item) => (
                <Link href={item.href} key={item.name}>
                  <p className="cursor-pointer font-semibold">{item.name}</p>
                </Link>
              ))}
              <button onClick={() => signOut()}>Log out</button>
              <picture>
                <img
                  src={session?.user?.image!}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full"
                />
              </picture>
            </div>
          ) : (
            <button>Login</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
