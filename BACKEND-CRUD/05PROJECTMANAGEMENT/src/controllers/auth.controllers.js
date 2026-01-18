import {User} from "../models/user.models.js"
import {ApiResponse} from "../utils/api-response.js"
import {asyncHandler} from "../utils/async-handler.js"
import {ApiError} from "../utils/api-error.js"


const generateAccessAndRefreshTokens = async (userId) => {

    try {
         const user = await User.findById(userId);
         const accessToken = user.generateAccessToken();
         const refreshToken = user.generateRefreshToken();

         user.refreshToken= refreshToken
         await user.save({validateBeforeSave: false})
         return {accessToken, refreshToken}
    } catch (error) {
         throw new ApiError(500, "Something went wrong while generating the access token ||",error);
    }
}

const registerUser = asyncHandler(async(req, res)=>{

  
    const {username, email, role, password} = req.body

    const existedUser = await User.findOne({
        $or: [{username, email}]
    })

    if(existedUser)
    {
        throw new ApiError(409, "User with email or username is already exists",[])
    }

    const user = await User.create({
        email,
        password,
        username,
        isEmailVarified: false
    })

    //generate the temporary token
    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken()


})