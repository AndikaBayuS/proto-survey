import { Menu, Transition } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment } from 'react';

const NavigationItem = [
  { name: 'Surveys', href: '/' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href={'/'}>
            <p className="cursor-pointer text-2xl font-semibold">
              <span className="text-blue-600">P</span>S
            </p>
          </Link>

          {status === 'authenticated' ? (
            <div className="flex items-center space-x-5">
              {NavigationItem.map((item) => (
                <Link href={item.href} key={item.name}>
                  <p className="cursor-pointer font-semibold">{item.name}</p>
                </Link>
              ))}
              <Menu as="div" className="relative inline-block">
                <Menu.Button>
                  <picture>
                    <img
                      src={session?.user?.image!}
                      alt="User Profile"
                      className="h-9 rounded-full"
                    />
                  </picture>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-3 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      <button
                        onClick={() => signOut()}
                        className="w-full px-4 py-3 text-left"
                      >
                        Log out
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            <button
              className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() =>
                signIn('google', { callbackUrl: 'http://localhost:3000' })
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
