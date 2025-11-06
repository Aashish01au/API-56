const jwt = require("jsonwebtoken")
const authSvc = require("../app/auth/auth.services")
require("dotenv").config()
const checkLogin = async (req,res,next)=>{
    try {
        let token = null
        if(req.query["token"]){
            token = req.query["token"]
        }
        if(req.headers["authorization"]){
            token = req.headers["authorization"]
        }
        if(!token){
            next({code:403, message:"Token is empty or required!!"})
        }else{
            token = (token.split(" ")).pop()
            if(!token){
                next({code:403, message:"Token is nnot set yet.."})
            }else{
                let data = jwt.verify(token,process.env.JWT_SECRET)
              
                if(!data.hasOwnProperty("_id")){
                    next({code:403, message:"User does   not exist anymore"})
                }else{
                    let userDetails = await authSvc.getUserByFilter({_id:data._id}) 
                    if(!userDetails[0]){
                        next({code:403, message:"User does not exist ..constacts to ur admin"})
                    } 
                   
                    req.authUser = userDetails[0]

                    next()
                }
            }
        }
    } catch (exception) {
        next(exception)
    }
}

module.exports = checkLogin