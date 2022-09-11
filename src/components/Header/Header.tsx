const Header = () => {
  return (
    <div className="border-2 border-dashed bg-white shadow">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <p className="text-lg font-semibold">Surveys</p>
          <button className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
            Buat Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
