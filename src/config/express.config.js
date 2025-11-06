const express = require("express")
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken")
const { ZodError } = require("zod")
const router = require("../routes")
const app = express()
require("./mongodb.middleware")
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

app.use("/api/v1",router)
app.use((req,res,next)=>{
    next({code:404,message:"Page not Found"})
})

app.use((error,req,res,next)=>{
    let code = error.code ?? 500
    let message = error.message ?? "Internal Server error"

    if(error instanceof ZodError){
        let errorBag = {}
        error.issues.map((errorObj)=>{
            errorBag[errorObj.path[0]]= errorObj.message
        })
        code=403
        message=errorBag
    }

    if(error instanceof JsonWebTokenError || error instanceof TokenExpiredError){
        code=403
        message=error.message
    }

    res.status(code).json({
        result:null,
        message:message,
        meta:null
    })

})

module.exports = app
