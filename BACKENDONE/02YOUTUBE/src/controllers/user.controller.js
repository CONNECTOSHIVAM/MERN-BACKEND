import asyncHandler from "../utlis/asyncHandler.js"
import { ApiError } from "../utlis/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utlis/cloudinary.js"
import { ApiResponse } from "../utlis/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
    
    //get user details from the frontend
    //vaildation - not empty
    //check if user already exists: username, email
    //check for images and avtar
    //upload them to cloudniary , avtar
    // create user object -- create a entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response
    
    const {username,email,fullname,password}=req.body
    // console.log(username);
    console.log(email)

    if(
        [fullname, email,username,password].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400,"All fileds are required.")
    }

    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })


    if(existedUser){
        throw new ApiError(409,"User with email and username already exists")
    }

    console.log(req.fiels)

    const avatarLocalPath = req.fiels?.avatar[0]?.path;
    const coverImageLocalPath = req.fiels?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required 1000%")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avtar is must required -- upload correct file ")
    }

    const user = await User.create(
        {
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()

        }
    )

    const createdUser = await User.findById(user._id).select("-password, -resfreshToken");

    if(!createdUser){
        throw new ApiError(500,"Sever issue...")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully.")
    )
})

export {registerUser}