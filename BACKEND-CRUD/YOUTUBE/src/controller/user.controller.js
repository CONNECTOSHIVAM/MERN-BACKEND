import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async(req, res)=>{

    // res.status(200).json({
    //     message: "Radhe radhe "
    // })

    // Algo:
    //get user details from fronend.
    // validation - not empty
    // check if user already exists: username, email
    // check for Images and avtar
    // upload them to clodinary
    // create a usr object - create entry in db.
    // remove password and refresh token field from response.
    // check for user creation.
    // return res
})

export {registerUser}