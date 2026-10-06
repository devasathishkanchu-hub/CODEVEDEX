import TodoItem from "./Task";

function TodoList({
  todos,
  deleteTodo,
  toggleTodo,
  editTodo,
  darkMode,
}) {
  if (todos.length === 0) {
    return (
      <div
        className={`py-12 text-center ${
          darkMode ? "text-gray-500" : "text-gray-400"
        }`}
      >
        <p className="text-lg">No tasks here.</p>
        <p className="mt-1 text-sm">Add something to get started.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}

export default TodoList;