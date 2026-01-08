import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({

    username:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minLength: 1,
        maxLength: 50,
        trim: true

    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        minLength: 5,
        maxLength: 50,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema);

