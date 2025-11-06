const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGODB_URL,{
    dbName:process.env.MONGODB_NAME,
    autoCreate:true,
    autoIndex:true
}).then((db)=>{
    console.log("DB is connected Successfully")
}).catch((error)=>{
    console.log("Error connecting DataBase Server")
})
