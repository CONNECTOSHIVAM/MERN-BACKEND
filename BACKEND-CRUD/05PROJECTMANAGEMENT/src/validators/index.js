import {body} from "express-validator"
import { AvailableUserRole } from "../utils/constants.js"
import { TaskStatusEnum } from "../utils/constants.js"


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
        body("fullName").optional().trim(),
           
    ]
}

const userLoginValidator = () => {
   return [
      body("email")
         .optional()
         .isEmail()
         .withMessage("Email is invalid."),
      body("password")
         .notEmpty()
         .withMessage("Password is must required."),
   ]
}

const userChangeCurrentPasswordValidator = () => {
   return [
      body("oldPassword")
               .notEmpty()
               .withMessage("old password is required.")
               .body("newPassword")
               .notEmpty()
               .withMessage("new password is required.")
   ]
}

const userForgotPasswordValidator = () => {

   return [

      body("email")
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Email is required.")
   ]
}

const userResetForgotPasswordValidator = () => {

   return [
      body("newPassword")
             .isEmpty()
             .withMessage("new password is required.")
   ]
}

const createProjectValidator = () => {

   return [
      body("name")
         .notEmpty()
         .withMessage("Name is required."),
      body("description").optional(),

   ]
}

const addMembersToProjectValidator = () => {

   return [
      body("email")
         .trim()
         .notEmpty()
         .withMessage("email is reuired.")
         .isEmail()
         .withMessage("Email is invalid."),
      body("role")
         .notEmpty()
         .withMessage("role is invalid.")
         .isIn(AvailableUserRole)
         .withMessage("Role is invalid.")
   ]
}

export {userRegisterValidator, userLoginValidator, userChangeCurrentPasswordValidator, userForgotPasswordValidator, userResetForgotPasswordValidator}