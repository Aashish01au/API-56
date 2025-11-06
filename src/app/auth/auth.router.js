const checkLogin = require("../../middleware/auth.middfleware")
const checkPermission = require("../../middleware/rbac.middleware")
const uploaders = require("../../middleware/uploaders.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const authCtrl = require("./auth.controller")
const { registerUserSchemaa, activateUserSchema, loginSchema, forgetpasswordSchema, resetPasswordSchema } = require("./auth.validator")

const authRouter = require("express").Router()

authRouter.post("/register",uploaders.single("image"),validatedSchema(registerUserSchemaa),authCtrl.registerUser)
authRouter.post("/activate/:token",validatedSchema(activateUserSchema),authCtrl.activateUser)
authRouter.post("/login",validatedSchema(loginSchema),authCtrl.loginUser)
authRouter.get("/me",checkLogin,checkPermission("admin"),authCtrl.profile)
authRouter.post("/forget-password",validatedSchema(forgetpasswordSchema),authCtrl.forgetPassword)
authRouter.post("/reset-password/:token",validatedSchema(resetPasswordSchema),authCtrl.resetPassword)

module.exports = authRouter