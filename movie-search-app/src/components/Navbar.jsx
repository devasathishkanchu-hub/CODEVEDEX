import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-8 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold">
        🎬 Movie Search App
      </Link>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">
          🏠 Home
        </Link>

        <Link to="/favorites" className="hover:text-red-400">
          ❤️ Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
