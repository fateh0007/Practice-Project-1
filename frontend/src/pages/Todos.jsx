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

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  /* ---------------- Fetch Todos ---------------- */
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

  /* ---------------- Create Todo ---------------- */
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

  /* ---------------- Toggle Todo ---------------- */
  const handleToggleTodo = async (todo) => {
    const res = await updateTodo(todo._id, {
      completed: !todo.completed,
    });

    setTodos((prev) =>
      prev.map((t) => (t._id === todo._id ? res.data.data : t))
    );
  };

  /* ---------------- Delete Todo ---------------- */
  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  /* ---------------- Edit Handlers ---------------- */
  const startEditing = (todo) => {
    setEditingTodoId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const cancelEditing = () => {
    setEditingTodoId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = async (todoId) => {
    if (!editTitle.trim() || !editDescription.trim()) return;

    const res = await updateTodo(todoId, {
      title: editTitle,
      description: editDescription,
    });

    setTodos((prev) =>
      prev.map((t) => (t._id === todoId ? res.data.data : t))
    );

    cancelEditing();
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-900 p-6">
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

        {/* Status */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        {/* Create Todo */}
        <form onSubmit={handleCreateTodo} className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Todo
          </button>
        </form>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => {
            const isEditing = editingTodoId === todo._id;

            return (
              <li
                key={todo._id}
                className="border p-4 rounded flex justify-between gap-4"
              >
                {/* Content */}
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(e.target.value)
                        }
                        className="w-full border px-2 py-1 rounded"
                      />
                    </div>
                  ) : (
                    <>
                      <h3
                        className={`font-semibold ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : ""
                        }`}
                      >
                        {todo.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {todo.description}
                      </p>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 text-sm">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => saveEdit(todo._id)}
                        className="text-blue-600 hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-gray-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleToggleTodo(todo)}
                        className="text-blue-600 hover:underline"
                      >
                        {todo.completed ? "Undo" : "Done"}
                      </button>
                      <button
                        onClick={() => startEditing(todo)}
                        className="text-green-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Empty State */}
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
