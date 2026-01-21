import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    email: {
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
}, { timestamps: true })


userSchema.pre("save",async function(){
   if(!this.isModified("password")) return ;
   this.password = await bcrypt.hash(this.password, 10)

})

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)