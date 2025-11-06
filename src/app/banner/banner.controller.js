const { deleteImage } = require("../../helpers/helpers")
const bannerSvc = require("./banner.services")

class BannerController{
    async createBanner(req,res,next){
        try {
           
            let banner = await  bannerSvc.transformBannerData(req)
            let response = await bannerSvc.storeBanner(banner)
            res.json({
                result:response,
                message:"Banner Created Successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getAllBanners(req,res,next){
        try {
            let search = req.query.search ?? null
            let limit = req.query.limit ?? 10
            let currentPage = (req.query.page)? Number(req.query.page) : 1
            let skip = (currentPage-1)*limit

            let filter = {}
            if(search){
                filter= {
                    ...filter,
                    $or:[
                        {title:new RegExp(search,"i")},
                        {link:new RegExp(search,"i")},
                        {status:new RegExp(search,"i")}
                    ]
                }
            }

            let count = await bannerSvc.totalcount(filter)
            let banners = await bannerSvc.getAllBannerDetails(filter,{skip:skip,limit:limit})

            res.json({
                result:banners,
                message:"Bnaner data fetched",
                meta:{
                    totalCount:count,
                    page:currentPage,
                    limit:limit
                }
            })
        } catch (exception) {
            next(exception)
        }
    }

    async updatedBanner(req,res,next){
        try {
            let id = req.params.id
            let bannerId = await bannerSvc.getAllBannerDetails({
                _id:id
            })
            if(bannerId.length !==1){
                next({code:403, message:"User Does not exist Any more"})
            }
            let banner = await  bannerSvc.transformBannerData(req,true)
           if(banner.image !==bannerId[0].image){
            deleteImage("./public/uploader/"+bannerId[0].image)
           }
            let updated = await bannerSvc.updateBannerById(id,banner)
            res.json({
                result:updated,
                message:"Banner updated Successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getBanerById(req,res,next){
        try {
            let id = req.params.id
            let bannerdetails = await bannerSvc.getBannerDetailsById(id)
            res.json({
                result:bannerdetails,
                message:"Banner Details Fetched!!",
                meta :null
            })
        } catch (exception) {
            next(exception)
        }
    } 
    
    async getBannerForHome(req,res,next){
        try {
            let limit = req.query.limit ?? 10
            let bannerDetails = await bannerSvc.getBannerForHomeDetails(limit)

            res.json({
                result : bannerDetails,
                message:" Baner details Fecthed..",
                 meta : null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async  deleteBanner(req,res,next){
        try {
            let banner = await bannerSvc.deleteBannerById(req.params.id)
    
            if(!banner){
                next({code:404, message:"Banner Does not exist"})
            }else{
                deleteImage("./public/uploader/"+banner.image)
                res.json({
                    result:banner,
                    message:"Banner Deleted Successfully"
                })
            }
        } catch (exception) {
            throw exception
        }
    }
}
    
const bannerCtrl = new BannerController()
module.exports = bannerCtrl