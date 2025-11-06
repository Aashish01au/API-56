const bannerCtrl = require("./banner.controller")
const BannerModel = require("./banner.model")

class BannerServices {
     transformBannerData(req, isEdit=false){
        try {
          
            let banner = {
                ...req.body,
                createdBy:req.authUser
            }

            if(!req.file && isEdit !==true){
                throw {code:401, message:"Validation failure",result:{image:"Image is required!!!"}}
            }else if(req.file){
                banner["image"] = req.file.filename
            }
            return banner


        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }

    async storeBanner(data){
        try {
            let banner =  new BannerModel(data)
            return await banner.save()
        } catch (exception) {
            throw exception
        }
    }

    async totalcount(filter){
        try {
            return await BannerModel.countDocuments(filter)
        } catch (exception) {
            throw exception
        }
    }

    async getAllBannerDetails(filter={},paging={skip:0,limit:0}){
        try {
            let banners = await BannerModel.find(filter)
                .populate("createdBy",["role","_id","name"])
                .sort({_id:"desc"})
                .skip(paging.skip)
                .limit(paging.limit)
            return banners
        } catch (exception) {
            throw exception
        }
    }

    async updateBannerById(id,data){
        try {
            let banner = await BannerModel.findByIdAndUpdate(id,{
                $set:data
            })

            return banner
        } catch (exception) {
            throw exception
        }
    }

    async getBannerDetailsById(id){
        try {
            let banner = await BannerModel.findById(id)
                .populate("createdBy",["role","_id","name"])
            
                return banner
        } catch (exception) {
            throw exception
        }
    }

    async deleteBannerById(id){
        try {
            let banner = await BannerModel.findByIdAndDelete(id)
            return banner
        } catch (exception) {
            throw exception
        }
    }

    async getBannerForHomeDetails(limit){
        try {
            let banner = await BannerModel.find({
                status:"active"
            })
            .populate("createdBy",["role","_id","name"])
            .sort({_id:"desc"})
            .limit(limit)
            return banner
        } catch (exception) {
            throw exception 
        }
    }
}
const bannerSvc = new BannerServices()
module.exports  = bannerSvc