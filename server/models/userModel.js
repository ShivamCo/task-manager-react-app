import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    tasks: [{ 
        "taskID": String, 
        "title": String, 
        "description": String, 
        "dueDate": String, 
        "completed": Boolean
    }]
})

export const UserModel = mongoose.model( 'UserModel', userSchema );