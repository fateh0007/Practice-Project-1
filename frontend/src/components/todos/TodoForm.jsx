import { useState } from "react"

const TodoForm = ({onCreate}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim() || !description.trim()) return;

        onCreate({title,description});

        setTitle("");
        setDescription("");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Todo
            </button>
        </form>
    )
}

export default TodoForm