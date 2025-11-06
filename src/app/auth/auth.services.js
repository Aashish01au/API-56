const UserModel = require("./user.model")

class AuthServices{
    async storeUser(data){
        try {
            let user = new UserModel(data)
            return await user.save()
        } catch (exception) {
            throw exception
        }
    }

    async getUserByFilter(filter={}){
        try {
            let user = await UserModel.find(filter)
            return user
        } catch (exception) {
            throw exception
        }
    }

    async updateUser(id,data){
        try {
            let update = await UserModel.findByIdAndUpdate(id,{
                $set:data
            })

            return update
        } catch (exception) {
            throw exception
        }
    }

    async getResetMessage(name,token){
        try {
            return `
            <h1>Dear ${name}, </h1> <br>
            <a href="${process.env.FRONTEND_URL}/reset-password/${token}">
            <p>Regards, no reply System</p>
            `
        } catch (exception) {
            throw exception
        }
    }
}

const authSvc = new AuthServices()
module.exports = authSvc