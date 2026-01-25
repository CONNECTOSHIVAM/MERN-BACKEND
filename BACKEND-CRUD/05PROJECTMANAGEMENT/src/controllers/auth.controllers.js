import {User} from "../models/user.models.js"
import {ApiResponse} from "../utils/api-response.js"
import {asyncHandler} from "../utils/async-handler.js"
import {ApiError} from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js"
import jwt from "jsonwebtoken"


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

  
     try {
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
        
     } catch (error) {
        
        console.error("register error ||"+error.message)
     }


})

const login = asyncHandler(async(req,res)=>{

    try {
        const { email, username, password } = req.body;

    if(!username || !email ){
        throw new ApiError(400,"Username or email is must required.")
    }

    const user = await User.findOne({
        $or: [{username:username},{email:email}]
    })

    if(!user)
    {
        throw new ApiError(400,"User does not exists")
    }


    //password chekcing.
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid)
    {
        throw new ApiError(400,"Password is incorrect")
    }

    //genrate a token

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggenInUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry",
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
                .cookie("accessToken",accessToken, options)
                .cookie("refreshToken",refreshToken, options)
                .json(
                    new ApiResponse(
                        200,
                        {
                            user: loggenInUser,
                            accessToken,
                            refreshToken
                        },
                        "User logged in successfully"
                    )
                )

    } catch (error) {
        console.error("login server error"+error.message)
    }

})

const logoutUser = asyncHandler(async(req, res)=>{

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: ""
            }
        },
        {
            new: true
        },
    );
    const options = {
        httpOnly: true,
        secure: true,

    }
    return res
            .status(200)
            .clearCookie("accessToken",options)
            .clearCookie("refreshToken",options)
            .json(new ApiResponse(200, {}, "User logged out"));
            

})

const getCurrentUser = asyncHandler(async(req, res)=>{
    return res
       .status(200)
       .json(
         new ApiResponse(
            200,
            req.user,
            "Current user fetched successfully."
         )
       )
})

const verifyEmail = asyncHandler(async(req, res)=>{

    const {verificationToken} = req.params;

    if(!verificationToken)
    {
        throw new ApiError(400, "Email verification token is missing")
    }

    let hashedToken = crypto
                         .createHash("sha256")
                         .update(verificationToken)
                         .digest("hex")

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationTokenExpiry: {$gt: Date.now()}
    })

    if(!user)
    {
        throw new ApiError(400, "Token is invalid or expired.");
    }

    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;

    user.isEmailVarified = true;
    await user.save({validateBeforeSave: false});

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    isEmailVarified: true
                },
                "Email is verified."
            )
        )

})

const resendEmailVerification = asyncHandler(async(req, res)=>{
     const user = await User.findById(req.user._id);

     if(!user)
     {
        throw new ApiError(404, "user does not exists")
     }
     if(user.isEmailVarified){
       throw new ApiError(409, "Email is already verified.")
     }

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

    return res
            .status(200)
            .json(new ApiResponse(
                200,
                {},
                "Mail has been to send to your email id."
            ))



})

const refreshAccessToken = asyncHandler(async(req, res)=>{
      
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken)
    {
        throw new ApiError(401,"unauthorized access.")
    }

    try {
       const decodedToken =  jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

       const user = await User.findById(decodedToken?._id);

       if(!user)
       {
        throw new ApiError(401, "Invalid refresh Token")
       }

       if(incomingRefreshToken !== user?.refreshToken)
       {
          throw new ApiError(401,"refresh token is expired.")
       }

       const options = {
        httpOnly: true,
        secure: true
       }

       const {accessToken, refreshToken: newRefreshToken} =  await generateAccessAndRefreshTokens(user._id)

       user.refreshToken = newRefreshToken;
       await user.save()

       return res
          .status(200)
          .cookie("accessToken",accessToken, options )
          .cookie(("refreshToken",newRefreshToken, options))
          .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed."
            )
          )
    } catch (error) {
        throw new ApiError(401, "invalid refresh Token.")
    }
})

const forgetPasswordRequest = asyncHandler(async(req, res)=>{

    const {email} = req.body;

    const user = await User.findOne({email})

    if(!user)
    {
        throw new ApiError(404,"Users does not exists.",[])
    }

    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();

    user.forgetPasswordToken = hashedToken
    user.forgetPasswordTokenExpiry = tokenExpiry

    await user.save({validateBeforeSave: false})

    await sendEmail({
            email: user?.email,
            subject: "Please verify your email",
            mailgenContent: emailVerificationMailgenContent(user.username,`${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`)
        });

    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "Password reset mail has been sent sent your mail id."
                )
            )
})

const resetForgotPassword = asyncHandler(async(req, res)=>{

    const {resetToken} = req.params
    const {newPassword} = req.body

    let hashedToken = crypto
                        .createHash("sha256")
                        .update(resetToken)
                        .digest("hex")


   const user = await User.findOne({
     forgetPasswordToken: hashedToken,
     forgetPasswordTokenExpiry: {$gt: Date.now( )}
   })

   if(!user)
   {
    throw new ApiError(489,"Token is inavalid or expired.")
   }

   user.forgetPasswordTokenExpiry = undefined
   user.forgetPasswordToken = undefined

   user.password = newPassword
   await user.save({validateBeforeSave: false})

   return res
           .status(200)
           .json(
             new ApiResponse(
                200,
                {},
                "Password reset successfully."
             )
           )
})

// const changeCurrentPassword = asyncHandler(async(req,res)=>{

//     const {oldPassword, newPassword} = req.body

//     const user =  User.findById(req.user?._id)

//     const isPasswordValid = await user.isPasswordCorrect(oldPassword)

//     if(!isPasswordValid)
//     {
//         throw new ApiError(400, "Invalid old Password")
//     }

//     user.password = password
//     await user.save({validateBeforeSave: false})

//     return res
//             .status(200)
//             .json(
//                 new ApiResponse(
//                     200,
//                     {},
//                     "Password changed successfully."
//                 )
//             )
// })

export {registerUser, login, logoutUser, getCurrentUser, verifyEmail, resendEmailVerification, refreshAccessToken, forgetPasswordRequest, resetForgotPassword, changeCurrentPassword}