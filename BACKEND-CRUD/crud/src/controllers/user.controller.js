import { User } from "../models/user.model";

const registerUser = async (req,res)=> {


    try {
        
        const {username, email, password} = req.body;

        if(!username || !email || !password)
        {
            return res.status
        }
    } catch (error) {
        
    }
}