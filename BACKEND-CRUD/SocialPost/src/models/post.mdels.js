import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true 
    },
    age: {
        type: Number,
        trim: true,
        min: 1,
        max: 10000
    }
},{timestamps: true})

export const Post = mongoose.model("Post",postSchema)