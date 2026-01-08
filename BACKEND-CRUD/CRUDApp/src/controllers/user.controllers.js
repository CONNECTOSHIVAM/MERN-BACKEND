import { User } from "../models/user.models";

const registerUser = async (req,res)=>{
   
    try {
        const {username, email,password} = req.body;
        
        //basic validation
        if(!username ||!email ||!password){
            return res.status
        }
        
    } catch (error) {
        return res.status(500).json("Server error aayya my dear!")
    }
}