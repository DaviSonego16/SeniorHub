import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="navbar fixed top-0 left-0 w-full z-50 bg-[#232529] border-b border-[#3a3c40] shadow-md">
      <div className="max-w-6xl mx-auto w-full px-4">

        <div className="flex-1">
          <Link 
            to="/" 
            className="text-3xl font-extrabold text-[var(--color-primary)]"
          >
            Senior Hub
          </Link>
        </div>

      </div>
    </div>
  );
}

