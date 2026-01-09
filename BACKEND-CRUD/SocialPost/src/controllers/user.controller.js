import { User } from "../models/user.models.js";

const registerUser = async (req,res) => {

    try {
        
        const {username,email,password} = req.body;

        //basic validations
        if(!username ||!email ||!password){
            return res.status(400).json({message: "All fields are must required."})
        }

        //check if user is already exists.
        const existUser = await User.findOne({email: email.toLowerCase()})

        if(existUser){
            return res.status(400).json({message: "user is already exists."})
        }


    } catch (error) {
        
    }
}