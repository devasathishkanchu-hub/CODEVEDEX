function TMDBAttribution() {
  return (
    <footer className="text-center py-8 mt-10 border-t border-gray-700">
      <p className="text-gray-400 text-sm">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>

      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 hover:text-blue-300"
      >
        Visit The Movie Database (TMDB)
      </a>
    </footer>
  );
}

export default TMDBAttribution;
