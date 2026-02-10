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
    const todos = await Todo.find({userId: req.user._id})
    return res
    .status(200)
    .json(
        new ApiResponse(200, todos, "Todos fetched successfully")
    )
})

const getTodoById = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const todo = await Todo.findOne({
        _id: id,
        userId: req.user._id
    })
    if(!todo){
        throw new ApiError(404, "Todo not found");
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, todo, "Todo fetched successfully")
    )
})

const updateTodo = asyncHandler(async(req, res) => {
    const todoId = req.params.id;
    const {title, description, completed} = req.body;
    
    if(!title && !description && completed === undefined){
        throw new ApiError(400, "At least one field is required")
    }

    const updateData = {};
    if(title!==undefined) updateData.title = title;
    if(description!==undefined) updateData.description = description;
    if(completed !== undefined) updateData.completed = completed;

    const todo = await Todo.findByIdAndUpdate(
        {
            _id: todoId,
            userId: req.user._id
        },
        {
            $set: updateData
        },
        {new: true}
    )

    if(!todo){
        throw new ApiError(404,"Todo not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,todo, "Todo updated successfully")
    )
})


const deleteTodo = asyncHandler(async(req, res) => {
    const todoId = req.params.id;
    const todo = await Todo.findOneAndDelete({
        _id: todoId,
        userId: req.user._id
    })
    if(!todo){
        throw new ApiError(404,"Todo not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, null, "Todo deleted successfully")
    )
})

export {createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo}