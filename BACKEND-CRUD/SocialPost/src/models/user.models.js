import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 21,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 3,
        maxLength: 21,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    }
},{timestamps: true})

/// before saving the password we need to hash it.

userSchema.pre("save",async function(){

    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema);