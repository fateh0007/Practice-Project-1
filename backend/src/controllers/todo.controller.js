import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import {Todo} from "../models/todo.model.js"

const createTodo = asyncHandler(async(req, res) => {
    const {title, description} = req.body

    if(!title?.trim() || !description?.trim()){
        throw new ApiError(400, "Title and description are required")
    }

    const todo = await Todo.create({
        title,
        description,
        userId: req.user._id
    })
    return res
    .status(201)
    .json(
        new ApiResponse(201, todo, "Todo created successfully")
    )
})

const getAllTodos = asyncHandler(async(req, res) => {
    
})

const getTodoById = asyncHandler(async(req, res) => {
    
})

const updateTodo = asyncHandler(async(req, res) => {
    
})

const deleteTodo = asyncHandler(async(req, res) => {
    
})

export {createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo}