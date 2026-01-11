import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center">
      <Link
        to="/home"
        className="text-xl sm:text-2xl md:text-3xl font-bold text-white cursor-pointer"
      >
        CommitNotes
      </Link>
    </header>
  );
}
