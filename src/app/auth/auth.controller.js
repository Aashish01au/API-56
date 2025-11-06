const generateRandomString = require("../../helpers/helpers")
const mailSvc = require("../../services/mail.services")
const AuthRequest = require("./auth.request")
const authSvc = require("./auth.services")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

class AuthContoller{
    async registerUser(req,res,next){
        try {
            let mapped = new AuthRequest(req).transformRegisterData()
         //   await mailSvc.sendEmail(mapped.email,"regoister Uzser",`<h1>Dear ${mapped.name},</h1>
          //  <hr>
            //<a href:"${process.env.FRONTEND_URL}/activate/:${mapped.token}">${process.env.FRONTEND_URL}/activate/:${mapped.token}</a>`)
            let data = await authSvc.storeUser(mapped)
            res.json({
                result:data,
                message:"User regisr Successfully",
                meta :null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async activateUser(req,res,next){
        try {
            let token = req.params.token
            let userDetails = await authSvc.getUserByFilter({
                token:token
            })

            if(userDetails.length !==1){
                next({code:403, message:"User Does not exist"})
            }else{
                let password = bcrypt.hashSync(req.body.password,10)
                let user = await authSvc.updateUser(userDetails[0],{
                    password:password,
                    status:"active",
                    token:null
                })
                res.json({
                    result:user,
                    message:"user activated Successfully",
                    meta:null
                })
            }

        } catch (exception) {
            next(exception)
        }
    }

    async loginUser(req,res,next){
        try {
            let credentilas = req.body
            let userDetails = await authSvc.getUserByFilter({
                email:credentilas.email
            })

            if(userDetails.length !==1){
                next({code:401, message:"user Does not exisat "})
            }else{
                userDetails=userDetails[0]
                if(userDetails.token !==null){
                    next({code:401, message:"User is not activated dYet"})
                }
                if(!bcrypt.compareSync(credentilas.password,userDetails.password)){
                    next({code:403, message:"credentials does ont match"})
                }else{
                    if(userDetails.status !=="active"){
                        next({code:401, message:"User is not activated dYet"})
                    }

                    let token = jwt.sign({_id:userDetails.id},process.env.JWT_SECRET,{
                        expiresIn:"1h"
                    })
                    let refreshToken = jwt.sign({_id:userDetails.id},process.env.JWT_SECRET,{
                        expiresIn:"7h"
                    })

                    res.json({
                        result:{
                            token :token,
                            refreshToken:refreshToken,
                            details:userDetails
                        },
                        message:"login Successfullty",
                        meta :null
                    })
                }
            }

        } catch (exception) {
            next(exception)
        }
    }

    async forgetPassword(req,res,next){
        try {
            let email = req.body.email
            let userDetails = await authSvc.getUserByFilter({
                email:email
            })
            if(userDetails.length !==1){
                next({code:401, message:"User Does not exist"})
            }
            let user = userDetails[0]

            user.forgetToken = generateRandomString()
            let date = new Date()
            date.setHours(date.getHours()+2)
            user.validateTill = date
            await user.save()
            let message = await authSvc.getResetMessage(user.name,user.forgetToken)

            await mailSvc.sendEmail(user.email,"Reset-password",message)
            res.json({
                result:{
                    details:user
                },
                message:"Plz.. check ur mail to reset ur password",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async resetPassword(req,res,next){
        try {
            let forgetToken = req.params.token
            let userDetails = await authSvc.getUserByFilter({
                forgetToken:forgetToken,
                validateTill:{$gte :Date.now()}
            })

            if(userDetails.length !==1){
                next({code:403, message:"User Does not exist"})
            }else{
                let password = bcrypt.hashSync(req.body.password,10)
                let user = await authSvc.updateUser(userDetails[0],{
                    password:password,
                    forgetToken:null,
                    validateTill:null
                })
                res.json({
                    result:user,
                    message:"ur password has  benn changed  Successfully",
                    meta:null
                })
            }
        } catch (exception) {
            next(exception)
        }
    }

    async profile(req,res,next){
        try {
            let user = req.authUser

            res.json({
                result:user,
                message:"User Profile",
                meta :null
            })
        } catch (exception) {
            next(exception)
        }
    }

}
const authCtrl=new AuthContoller()
module.exports = authCtrl
