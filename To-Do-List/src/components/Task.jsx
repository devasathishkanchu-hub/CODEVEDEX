import { useState } from "react";

function TodoItem({ todo, deleteTodo, toggleTodo, editTodo, darkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function saveEdit() {
    const trimmedText = editText.trim();

    if (!trimmedText) {
      return;
    }

    editTodo(todo.id, trimmedText);
    setIsEditing(false);
  }

  function cancelEdit() {
    setEditText(todo.text);
    setIsEditing(false);
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-3 ${
        darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
      }`}
    >
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-xs ${
          todo.completed
            ? "border-green-500 bg-green-500 text-white"
            : darkMode
              ? "border-gray-500"
              : "border-gray-400"
        }`}
      >
        {todo.completed && "✓"}
      </button>

      {isEditing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveEdit();
            }

            if (e.key === "Escape") {
              cancelEdit();
            }
          }}
          className={`min-w-0 flex-1 rounded border px-2 py-1 outline-none ${
            darkMode
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-white"
          }`}
        />
      ) : (
        <span
          className={`min-w-0 flex-1 wrap-break-words ${
            todo.completed ? "text-gray-400 line-through" : ""
          }`}
        >
          {todo.text}
        </span>
      )}

      <div className="flex shrink-0 gap-2">
        {isEditing ? (
          <>
            <button
              onClick={saveEdit}
              className="text-sm font-medium text-green-500 hover:text-green-600"
            >
              Save
            </button>

            <button
              onClick={cancelEdit}
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              Edit
            </button>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-sm font-medium text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
