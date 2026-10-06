import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import TMDBAttribution from "../components/TMDBAttribution";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold">My Favorites ❤️</h1>

          <p className="text-gray-400 mt-2">
            Your favorite movies in one place
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">💔</p>

            <p className="text-xl text-gray-400">No favorite movies yet.</p>

            <p className="text-gray-500 mt-2">
              Add movies to your favorites and they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavoriteChange={setFavorites}
              />
            ))}
          </div>
        )}

        <TMDBAttribution />
      </div>
    </div>
  );
}

export default Favorites;
