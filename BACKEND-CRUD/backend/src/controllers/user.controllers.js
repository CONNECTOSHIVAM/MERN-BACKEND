// Handle the login/sign up.
import { User } from "../models/user.model.js";

const registerUser = async (req,res) => {
    try {
        const {username,email,password} = req.body;

        //Basic validation
        if(!username || !email ||!password){
            return res.status(400).json({message: "All fields are important! "})
        }
         
        //check if user already in database exist.

        const existUser = await User.findOne({email: email.toLowerCase()});
        if(existUser){
            return res.status(400).json({message: "user already exists."})
        }

        //create a user.
        const user = await User.create({
            username,
            email,
            password,
            loggedIn: false
        })

        res.status(201).json({
            message: "User registered",
            user: {id: user._id,email: user.email,username: user.username}
        })
    } catch (error) {
        return res.status(500).json("Server is Busy...my dear")
    }
}

export {registerUser}