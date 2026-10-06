import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import Navbar from "../components/Navbar";
import TMDBAttribution from "../components/TMDBAttribution";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    getMovieDetails(id)
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error("TMDB Error:", error);
        setError("Something went wrong while loading movie details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-block mb-8 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
        >
          ← Back to Home
        </Link>

        {loading ? (
          <p className="text-center text-xl text-gray-400">
            Loading movie details... 🎬
          </p>
        ) : error ? (
          <p className="text-center text-xl text-red-400">{error}</p>
        ) : movie ? (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-80">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 text-center">
                    🎬
                    <br />
                    No Poster Available
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold">{movie.title}</h1>

              <p className="text-yellow-400 text-lg mt-4">
                ⭐ {movie.vote_average?.toFixed(1)}
              </p>

              <p className="text-gray-300 mt-6 leading-7">
                {movie.overview || "No description available."}
              </p>

              <div className="mt-6 space-y-3 text-gray-300">
                <p>
                  <span className="font-semibold text-white">
                    Release Date:
                  </span>{" "}
                  {movie.release_date || "Not available"}
                </p>

                <p>
                  <span className="font-semibold text-white">Runtime:</span>{" "}
                  {movie.runtime ? `${movie.runtime} minutes` : "Not available"}
                </p>

                <p>
                  <span className="font-semibold text-white">Genres:</span>{" "}
                  {movie.genres?.length > 0
                    ? movie.genres.map((genre) => genre.name).join(", ")
                    : "Not available"}
                </p>

                <p>
                  <span className="font-semibold text-white">Language:</span>{" "}
                  {movie.original_language?.toUpperCase() || "Not available"}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <TMDBAttribution />
      </div>
    </div>
  );
}

export default MovieDetails;
