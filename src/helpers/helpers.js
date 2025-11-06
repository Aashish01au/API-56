const fs = require("fs")
const generateRandomString=(len=100)=>{
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let length = chars.length
    let random = ""
    for(i=0; i<len; i++){
        let position =Math.floor(Math.random()*(length-1))
        random += chars[position]
    }

    return random
}

const deleteImage =(path)=>{
    try {
        if(fs.existsSync(path)){
            fs.unlinkSync(path)
            return true
        }else{
            return false
        }
       
    } catch (exception) {
        throw exception
    }
}

module.exports = {
    generateRandomString,
    deleteImage
}