import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

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

//before saving any password we need to hash it
userSchema.pre("save", async function(){

    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10);

})

//compare a password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema);

