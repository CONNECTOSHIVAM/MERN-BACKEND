import { User } from "../models/user.model";

const registerUser = async (req,res)=> {


    try {
        
        const {username, email, password} = req.body;

        if(!username || !email || !password)
        {
            return res.status(400).json({message: "All fields are requireds"})
        }

        //check is user is exist or not.
        const existing = await User.findOne({
            email: email.toLowerCase()
        })

        if(existing){
            return res.status(400).json({message: "User alredy exists."})
        }

        //now if user is not exists then create a user.

        const user = await User.create({
            username,
            email: email.toLowerCase,
            password,
            loggedIn : false
        })

        res.status(201).json({
            message: "User registered successfully.",
            user: {user: user._id,username: user.username,email: user.email}
        })

    } catch (error) {
            res.status(500).json({message: "Internal server error || "+ error.message})
    }
}

export {registerUser}