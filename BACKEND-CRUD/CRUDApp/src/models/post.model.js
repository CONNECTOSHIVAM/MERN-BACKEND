import mongoose, {mongo, Schema} from "mongoose";

const postSchema = new Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
        minLength: 1,
        maxLength: 50,
        trim: true
    },
    description:{
        type: String,
        require: true,
        trim: true
    },
    age:{
        type: Number,
        trim: true,
        min: 1,
        max: 1000

    }
},{timestamps: true})

export const Post = mongoose.model("Post",postSchema)