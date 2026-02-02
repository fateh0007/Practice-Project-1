import mongoose, { Schema } from "mongoose"

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
})

export const Todo = mongoose.model("Todo", todoSchema)