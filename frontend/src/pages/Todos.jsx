import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todo.api";

const Todos = () => {
  const { logout } = useAuth();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getAllTodos();
        setTodos(res.data.data);
      } catch {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Create todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) return;

    try {
      const res = await createTodo({ title, description });
      setTodos((prev) => [res.data.data, ...prev]);
      setTitle("");
      setDescription("");
    } catch {
      setError("Failed to create todo");
    }
  };

  // Toggle complete
  const handleToggleTodo = async (todo) => {
    const res = await updateTodo(todo._id, {
      completed: !todo.completed,
    });

    setTodos((prev) =>
      prev.map((t) => (t._id === todo._id ? res.data.data : t))
    );
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-700 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Todos</h1>
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>

        {/* States */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        {/* Create Todo */}
        <form onSubmit={handleCreateTodo} className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Add Todo
          </button>
        </form>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="border p-3 rounded flex justify-between items-start"
            >
              <div>
                <h3
                  className={`font-semibold ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {todo.description}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleTodo(todo)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {todo.completed ? "Undo" : "Done"}
                </button>

                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Empty state */}
        {!loading && todos.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No todos yet. Add one above 👆
          </p>
        )}
      </div>
    </div>
  );
};

export default Todos;
