// mongoose user schema

import mongoose ,{Schema}from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minLength:6,
        maxLength:21
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema);