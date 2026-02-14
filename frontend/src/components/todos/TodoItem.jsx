const TodoItem = ({
  todo,
  isEditing,
  editTitle,
  editDescription,
  onToggle,
  onDelete,
  onStartEdit,
  onSave,
  onCancel,
  onEditTitleChange,
  onEditDescriptionChange,
}) => {
  return (
    <li className="border p-4 rounded flex justify-between gap-4">
      {/* Content */}
      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <input
              value={editTitle}
              onChange={(e) => onEditTitleChange(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
            <textarea
              value={editDescription}
              onChange={(e) =>
                onEditDescriptionChange(e.target.value)
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
              onClick={() => onSave(todo._id)}
              className="text-blue-600 hover:underline"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onToggle(todo)}
              className="text-blue-600 hover:underline"
            >
              {todo.completed ? "Undo" : "Done"}
            </button>
            <button
              onClick={() => onStartEdit(todo)}
              className="text-green-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
