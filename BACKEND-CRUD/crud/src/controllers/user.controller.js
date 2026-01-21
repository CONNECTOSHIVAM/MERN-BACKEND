import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {


    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are requireds" })
        }

        //check is user is exist or not.
        const existing = await User.findOne({
            email: email.toLowerCase()
        })

        if (existing) {
            return res.status(400).json({ message: "User alredy exists." })
        }

        //now if user is not exists then create a user.

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        })

        res.status(201).json({
            message: "User registered successfully.",
            user: { user: user._id, username: user.username, email: user.email }
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error || " + error.message })
    }
}

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() })

        if (!user) return res.status(404).json({ message: "Username is not found -- Please register." })

        //comapre passwords
        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(400).json({ message: "Invalid password credentials" })

        res.status(200).json({
            message: "User Logged In successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })


    } catch (error) {

        res.status(500).json({message: "Internal sever error - login issue || "+error.message})

    }


}

const logoutUser = async (req, res) => {

    try {
        
        const {email} = req.body;

        const user = await User.findOne({email: email.toLowerCase()})

        if(!user) return res.status(404).json({message: "User not found"})

        res.status(200).json({message: "User logout succuessfully"})
    } catch (error) {
        
        res.status(500).json({message: "Internal Server error Logout error || "+error.message})
    }
}

export { registerUser, loginUser, logoutUser }