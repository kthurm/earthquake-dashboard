interface HeaderProps {
  title: string;
  count: number;
}

function Header({ title, count }: HeaderProps) {
  return (
    <header className="w-full lg:max-w-4xl mx-auto p-3 md:p-5 mt-2">
      <p className="text-xl text-primary font-bold">
        {title}:{" "}
        <span className="text-secondary-dark uppercase text-base">
          {count.toLocaleString()} earthquakes
        </span>
      </p>
    </header>
  );
}

export default Header;
