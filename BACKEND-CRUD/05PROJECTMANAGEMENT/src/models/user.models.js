import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({

    avatar:{
        type: {
            url: String,
            localPath:String
        },
        default: {
            url: `https://placehold.co/200x200`,
            localPath: ""
        }
       
    },
    username: {
       type: String,
       required: true,
       lowercase: true,
       unique: true,
       index: true,
       minLength: 1,
       maxLength: 45,
       trim: true
    },
    email: {
       type: String,
       required: true,
       lowercase: true,
       unique: true,
       minLength: 1,
       maxLength: 45,
       trim: true
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 1,
        maxLength: 45,
        trim: true
    },
    password:{
        type: String,
        required: [true, "Password is required."]
    },
    isEmailVarified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
    },
    forgetPasswordToken: {
        type: String,
    },
    forgetPasswordTokenExpiry: {
        type: Date
    },
    emailVerificationToken: {
        type: Date,
    },
    emailVerificationTokenExpiry: {
        type: Date
    }

},{timestamps: true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

// userSchema.methods.isPasswordCorrect = async function(password){
//     return await bcrypt.compare(password,this.password)
// }

export const User = mongoose.model("User",userSchema);