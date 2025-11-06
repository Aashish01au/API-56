const multer = require("multer")
const fs = require("fs")
const  myStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        let path = "./public/uploader/"
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{
                recursive:true
            })
        }
        cb(null,path)
    },
    filename:(req,file,cb)=>{
        let ext = (file.originalname.split(".")).pop()
        let name = Date.now() + "." + ext

        cb(null,name)
    }
})

const imageFilter = (req,file,cb)=>{
    let allowed =["jpeg","png","jpg","bmp","webp","gif","svg"]
    let ext = (file.originalname.split(".")).pop()
    if(allowed.includes(ext.toLowerCase())){
        cb(null,true)
    }else{
        cb({code:403, message:"File type not supported"},null)
    }
}
const uploaders = multer({
    storage:myStorage,
    fileFilter:imageFilter,
    limits:{
        fileSize:3000000
    }
})
module.exports = uploaders