import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import Theme from "./components/Theme";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  function addTodo(text) {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setTodos((currentTodos) => [newTodo, ...currentTodos]);
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  function toggleTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });
    });
  }

  function editTodo(id, newText) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: newText,
          };
        }

        return todo;
      });
    });
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
      }`}
    >
      <div className="mx-auto min-h-screen max-w-2xl px-4 py-8 sm:py-12">
        <header className="mb-6 flex items-center justify-between sm:mb-8">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">My Todo List</h1>

            <p
              className={`mt-2 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Keep your day organized.
            </p>
          </div>

          <Theme darkMode={darkMode} setDarkMode={setDarkMode} />
        </header>

        <main
          className={`rounded-2xl p-4 shadow-md sm:p-6 ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          <AddTodo addTodo={addTodo} darkMode={darkMode} />

          <Filters filter={filter} setFilter={setFilter} darkMode={darkMode} />

          <TaskList
            todos={filteredTodos}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            darkMode={darkMode}
          />

          <div
            className={`mt-6 border-t pt-4 text-sm ${
              darkMode
                ? "border-gray-700 text-gray-400"
                : "border-gray-200 text-gray-500"
            }`}
          >
            {remainingTodos === 1
              ? "1 task remaining"
              : `${remainingTodos} tasks remaining`}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
