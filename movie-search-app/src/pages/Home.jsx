import { useEffect, useState } from "react";
import { searchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import TMDBAttribution from "../components/TMDBAttribution";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    searchMovies("Avengers")
      .then((movies) => {
        setMovies(movies);
      })
      .catch((error) => {
        console.error("TMDB Error:", error);
        setError("Something went wrong while loading movies.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    searchMovies(query)
      .then((movies) => {
        setMovies(movies);
      })
      .catch((error) => {
        console.error("TMDB Error:", error);
        setError("Something went wrong while searching.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Movie Search App 🎬
          </h1>

          <p className="text-gray-400 mt-2">Search for your favorite movies</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-10 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            🔍 Search
          </button>
        </div>

        {loading ? (
          <p className="text-center text-xl text-gray-400">
            Loading movies... 🎬
          </p>
        ) : error ? (
          <p className="text-center text-xl text-red-400">{error}</p>
        ) : movies.length === 0 ? (
          <p className="text-center text-xl text-gray-400">
            🔍 No movies found. Try another search.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        <TMDBAttribution />
      </div>
    </div>
  );
}

export default Home;
