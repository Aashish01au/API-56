const checkPermission = (checkRole)=>{
    return (req,res,next)=>{
        let user = req.authUser
        if(typeof checkRole ==="string" && user.role.toLowerCase() !=checkRole.toLowerCase()){
            next({code:403, message:"U  dont have pervilage to access the system..."})
        }else if(typeof checkRole =="object" && !(checkRole.includes(user.role.toLowerCase()))){
            next({code:403, message:"U  dont have pervilage to access the system"})
        }else{
            next()
        }
    }
}

module.exports = checkPermission