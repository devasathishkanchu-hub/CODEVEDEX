import { useState } from "react";

function TodoForm({ addTodo, darkMode }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    addTodo(trimmedText);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className={`min-w-0 flex-1 rounded-lg border px-4 py-3 outline-none transition focus:ring-2 ${
          darkMode
            ? "border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-gray-600"
            : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-gray-300"
        }`}
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
