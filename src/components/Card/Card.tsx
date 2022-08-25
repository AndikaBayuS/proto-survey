interface Props {
  owner: string;
  title: string;
  description: string;
}

const Card: React.FC<Props> = ({ owner, title, description }) => {
  return (
    <div className="max-w-sm rounded-xl border bg-white p-4 shadow-sm">
      <div className="">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-xs text-gray-600">Author: {owner}</p>
        <p className="mt-3">{description}</p>
      </div>

      <button className=" mt-3 rounded-full bg-blue-500 py-2 px-4 font-semibold text-white duration-300 ease-in-out hover:bg-blue-700">
        Mulai Survei
      </button>
    </div>
  );
};

export default Card;
