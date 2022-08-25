interface Props {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  return <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">{children}</div>;
};

export default BaseLayout;
