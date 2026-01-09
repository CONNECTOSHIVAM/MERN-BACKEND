import { User } from "../models/user.models.js";

const registerUser = async (req,res) => {

    try {
        
        const {username,email,password} = req.body;

        if(!username ||!email ||!password){
            return res.status(400).json({message: "All fields are must required."})
        }
    } catch (error) {
        
    }
}