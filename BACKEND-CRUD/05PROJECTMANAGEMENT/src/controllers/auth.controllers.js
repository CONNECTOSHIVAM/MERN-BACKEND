import {User} from "../models/user.models.js"
import {ApiResponse} from "../utils/api-response.js"
import {asyncHandler} from "../utils/async-handler.js"
import {ApiError} from "../utils/api-error.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js"


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

    user.emailVerificationToken = hashedToken
    user.emailVerificationTokenExpiry = tokenExpiry


    await user.save({validateBeforeSave: false})

    await sendEmail(
        {
            email: user?.email,
            subject: "Please verify your email",
            mailgenContent: emailVerificationMailgenContent(user.username,`${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`)
        }
    )

    const createdUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry");

    if(!createdUser)
    {
        throw new ApiError(500,"Something went wrong while registering a user")
    }

    res.status(201).json(
        new ApiResponse(
            200,
            {user: createdUser},
            "User registered successfully and verification email has been sent on your email."
        )
    )


})


export {registerUser}