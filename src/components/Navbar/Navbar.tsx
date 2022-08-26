import { signIn, signOut, useSession } from "next-auth/react";
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

              <div className="dropdown dropdown-end">
                <label className="avatar btn btn-ghost btn-circle" tabIndex={0}>
                  <picture>
                    <img
                      src={session?.user?.image!}
                      alt="User Profile"
                      className="rounded-full"
                    />
                  </picture>
                </label>

                <ul
                  className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
                  tabIndex={0}
                >
                  <li>
                    <button onClick={() => signOut()}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              className="btn btn-sm rounded-full border-none bg-blue-500 text-xs hover:bg-blue-700"
              onClick={() =>
                signIn("google", { callbackUrl: "http://localhost:3000" })
              }
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
