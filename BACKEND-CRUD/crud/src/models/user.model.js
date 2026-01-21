import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
    usernme:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

export const User = mongoose.model("User",userSchema)