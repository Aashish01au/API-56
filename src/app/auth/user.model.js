const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:3,
        max:35
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["admin","seller","customer"],
        require:true,
        default:"customer"
    },
    status:{
        type: String,
        enum:["active","inactive"],
        require:true,
        default:"inactive"
    },
    image:String,
    token:String,
    forgetToken:String,
    validateTill:Date,
    password:String
},{
    autoCreate:true,
    autoIndex:true,
    timestamps:true
})

const UserModel = mongoose.model("User",UserSchema)
module.exports= UserModel 