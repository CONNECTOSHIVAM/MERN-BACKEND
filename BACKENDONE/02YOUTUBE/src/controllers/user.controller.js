import asyncHandler from "../utlis/asyncHandler.js"
import { ApiError } from "../utlis/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utlis/cloudinary.js"
import { ApiResponse } from "../utlis/ApiResponse.js"



const registerUser = asyncHandler(async (req, res) => {

  console.log("REQ FILES ===>", req.files);

  const { username, email, fullname, password } = req.body;

  if ([fullname, email, username, password].some(f => !f?.trim())) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required 1000%");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const user = await User.create({
    fullname,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});


export {registerUser}