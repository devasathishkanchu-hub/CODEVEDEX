function FilterButtons({ filter, setFilter, darkMode }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="mt-6 flex gap-2">
      {filters.map((item) => {
        const isSelected = filter === item;

        return (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
              isSelected
                ? "bg-blue-600 text-white"
                : darkMode
                ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default FilterButtons;