import api from "./axios"

export const createTodo = (data) => {
    return api.post("/todos/createTodo", data);
};

export const getAllTodos = () => {
    return api.get("/todos/getAllTodos");
};

export const getTodoById = (id) => {
    return api.get(`/todos/${id}`);
};

export const updateTodo = (id,data) => {
    return api.put(`/todos/${id}`,data);
};

export const deleteTodo = (id) => {
    return api.delete(`/todos/${id}`);
};