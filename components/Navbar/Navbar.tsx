import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={"/"}>
            <p className="cursor-pointer text-2xl font-semibold">
              <span className="text-blue-600">Proto</span>Survey
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
