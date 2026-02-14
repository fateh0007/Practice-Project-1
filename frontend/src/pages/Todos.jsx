import {useEffect,useState} from "react";
import {useAuth} from "../hooks/useAuth"
import {getAllTodos, createTodo,updateTodo, deleteTodo} from "../api/todo.api"

const Todos = () => {
    return(
        <div>
            Todos Page
        </div>
    )
}

export default Todos;