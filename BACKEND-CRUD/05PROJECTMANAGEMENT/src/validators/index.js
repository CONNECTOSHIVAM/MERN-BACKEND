import {body} from "express-validator"


const userRegisterValidator = () => {
    return [
        body("email")
           .trim()
           .notEmpty()
           .withMessage("email is required.")
           .isEmail()
           .withMessage("email is invalid."),
        body("username")
           .trim()
           .notEmpty()
           .withMessage("username is required.")
           .isLowercase()
           .withMessage("username must be in a lowercase.")
           .isLength({min:3})
           .withMessage("username must be at least 3 character long."),
        body("password")
           .trim()
           .notEmpty()
           .withMessage("password is must required")
           .isLength({min:6})
           .withMessage("password must be at least of 6 character."),
        body("fullName").optional.trim(),
           
    ]
}

export {userRegisterValidator}