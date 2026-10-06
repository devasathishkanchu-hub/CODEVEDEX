function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
        darkMode
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-white shadow hover:bg-gray-50"
      }`}
      aria-label="Toggle dark mode"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;