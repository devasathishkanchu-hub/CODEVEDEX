import { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, onFavoriteChange }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    return favorites.some((favorite) => favorite.id === movie.id);
  });

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyFavorite = favorites.some(
      (favorite) => favorite.id === movie.id,
    );

    if (alreadyFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== movie.id,
      );

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      setIsFavorite(false);

      if (onFavoriteChange) {
        onFavoriteChange(updatedFavorites);
      }
    } else {
      favorites.push(movie);

      localStorage.setItem("favorites", JSON.stringify(favorites));

      setIsFavorite(true);

      if (onFavoriteChange) {
        onFavoriteChange(favorites);
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <Link to={`/movie/${movie.id}`}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-80 object-cover"
          />
        ) : (
          <div className="w-full h-80 bg-gray-700 flex items-center justify-center">
            <p className="text-gray-400 text-center">
              🎬
              <br />
              No Poster Available
            </p>
          </div>
        )}

        <div className="p-4">
          <h2 className="text-xl font-bold text-white">{movie.title}</h2>

          <p className="text-yellow-400 mt-2">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={handleFavorite}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
        >
          {isFavorite ? "🗑️ Remove from Favorites" : "❤️ Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
