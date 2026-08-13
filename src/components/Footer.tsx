function Footer() {
  return (
    <footer className="flex justify-between items-center bg-primary w-screen px-3 md:px-5 py-4 text-white drop-shadow-xl/25">
      <p className="text-xs w-full">
        &copy; {new Date().getFullYear()} Earthquake Dashboard. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
