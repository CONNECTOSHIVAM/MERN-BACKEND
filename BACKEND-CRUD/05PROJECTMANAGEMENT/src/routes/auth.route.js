import { Router } from "express";
import { changeCurrentPassword, forgetPasswordRequest, getCurrentUser, login, logoutUser, refreshAccessToken, registerUser, resendEmailVerification, resetForgotPassword, verifyEmail } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userChangeCurrentPasswordValidator, userForgotPasswordValidator, userLoginValidator, userRegisterValidator, userResetForgotPasswordValidator } from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//unsecured routes.
router.route("/register").post(userRegisterValidator(), validate, registerUser)
router.route("/login").post(userLoginValidator(), validate, login)
router.route("/verify-email/:verificationToken").get(verifyEmail)
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(userForgotPasswordValidator(), validate, forgetPasswordRequest);
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(), validate, resetForgotPassword)

//secure routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/current-user").post(verifyJWT, getCurrentUser)
router.route("/change-password").post(verifyJWT, userChangeCurrentPasswordValidator(), validate, changeCurrentPassword)
router.route("/resend-email-varification").post(verifyJWT, resendEmailVerification)

export default router;