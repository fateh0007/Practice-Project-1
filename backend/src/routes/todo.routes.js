import {Router} from "express"
import {createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo} from "../controllers/todo.controller"
import {verifyJWT} from "../middlewares/auth.middleware"

const router = Router()

router.route("/createTodo").post(verifyJWT, createTodo)
router.route("/getAllTodos").get(verifyJWT, getAllTodos)
router.route("/:id").get(verifyJWT, getTodoById)
router.route("/:id").put(verifyJWT, updateTodo)
router.route("/:id").delete(verifyJWT, deleteTodo)

export default router