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

        //create a User.
        const user = await User.create({
            username,
            email,
            password,
            LoggedIn: false
        })

        res.status(201).json({
            message: "User successfully registered.",
            user: {id: user._id,username: user.username,email: user.email}
        })


    } catch (error) {
        console.error(`Registration Error hu main : ${error}`)
        return res.status(500).json({message: error.message})
    }
}

const loginUser = async (req,res) => {

    try {
         const {email, password} = req.body;

         const user = await User.findOne({email: email.toLowerCase()})

         if(!user) return res.status(400).json({
            message: "user not found."
         })

         const isMatch = await user.comparePassword(password);
         if(!isMatch) return res.status(400).json(
            {message: "enter the correct details."}
         )

         res.status(200).json({
            message: "successfully Loggen In Dear...",
            user: {id: user._id, username: user.username,email: user.email}
         })

    } catch (error) {
        console.error("Login server error ",error)
        return res.status(500).json({message: error.message})
    }
}

const logoutUser = async () => {

    try {

        const {email} = req.body;

        const user = await User.findOne({email})

        if(!user) return res.status(404).json({
            message: "User is not found -- try to register first."
        })

        res.status(200).json({
            message: "User logout successfully."
        })
        
    } catch (error) {
        console.error("Logout server error :",error)
        return res.status(500).json({
            message: "server error: "+error.message
        })
    }

}

export {registerUser, loginUser, logoutUser}