import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto w-full px-4">

        <div className="flex-1">
          <Link 
            to="/" 
            className="text-4xl font-extrabold text-secondary"
          >
            Senior Hub
          </Link>
        </div>

      </div>
    </div>
  );
}
