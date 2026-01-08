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

const loginUser = async(req,res) => {

    try {
        
        //checking if the user already exists.
        const {email,password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase(),
        })

        if(!user) return res.status(400).json({
            message: "user not found."
        })

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid Credentials"
        })

        res.status(200).json({
            message: "user logged In",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        console.error("Logged In Error",error)
        res.status(500).json({
            message: error.message
        })
    }
} 

const loggedOut = async(req,res) => {
    try {
        
        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user) return res.status(404).json({
            message: "User not found"
        })

        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Logout Error",error)
        return res.status(500).json({message: error.message})
    }
}

export {registerUser, loginUser, loggedOut}