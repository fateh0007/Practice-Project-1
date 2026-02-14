import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todo.api";
import TodoForm from "../components/todos/TodoForm";
import TodoItem from "../components/todos/TodoItem";

const Todos = () => {
  const { logout } = useAuth();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        <TodoForm
          onCreate={async (data) => {
            try {
                const res = await createTodo(data);
                setTodos((prev) => [res.data.data, ...prev]);
            } catch (error) {
                setError("Failed to create Todo")
            }
          }}
        />

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => {
            const isEditing = editingTodoId === todo._id;

            return (
              <TodoItem
                key={todo._id}
                todo={todo}
                isEditing={editingTodoId === todo._id}
                editTitle={editTitle}
                editDescription={editDescription}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onStartEdit={startEditing}
                onSave={saveEdit}
                onCancel={cancelEditing}
                onEditTitleChange={setEditTitle}
                onEditDescriptionChange={setEditDescription}
              />
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
