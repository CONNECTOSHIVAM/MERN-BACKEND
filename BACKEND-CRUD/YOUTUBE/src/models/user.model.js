import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({

    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname:{
        type: String,
        required: true,
        trim: true
    },
    password:
    {
        type: String,
        required: true,
        trim: true
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshToken: {
       type: String,
       required: [true, "password is required."]
    },
    avtar:{
        type: String, // cloudnaryurl
        required: true
    },
    coverImage: {
        type: String,
    }
},{timestamps: true})

export const User = mongoose.model("User",userSchema);