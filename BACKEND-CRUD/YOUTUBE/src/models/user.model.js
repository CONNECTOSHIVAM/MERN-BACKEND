import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

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

userSchema.pre("save",async function(next){
   if(!isModified("password")) return next(); 
   this.password = await bcrypt.hash(this.password,10)
   next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){};
userSchema.methods.generateRefreshToken = function(){};

export const User = mongoose.model("User",userSchema);