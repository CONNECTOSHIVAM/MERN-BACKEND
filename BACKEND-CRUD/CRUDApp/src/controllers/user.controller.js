import { User } from "../models/user.models.js";

const registerUser = async (req,res)=>{
   
    try {
        const {username, email,password} = req.body;
        
        //basic validation
        if(!username ||!email ||!password){
            return res.status(400).json({message: "All fields are must required."})
        }

        //check if user already exist in database.
        const existUser = await User.findOne({email: email.toLowerCase()}) 

        if(existUser){
            return res.status(400).json({messgae: "User is already exist."})
        }

        //create a user
        const user = await User.create({
            username,
            email,
            password,
            loggedIn: false
        })

        res.status(201).json({
            message: "user is registered successfully.",
            user: {id: user._id,username: user.username, email:user.email}
        })
        
    } catch (error) {
        console.error(`Register Error`,error)
        return res.status(500).json({message: error.message})
    }
}

export {registerUser}