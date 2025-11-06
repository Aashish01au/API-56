const { deleteImage } = require("../../helpers/helpers")
const brandSvc = require("./brand.services")

class BrandController{
    async createBrand(req,res,next){
        try {
           
            let brand = await  brandSvc.transformBrandData(req)
            let response = await brandSvc.storeBrand(brand)
            res.json({
                result:response,
                message:"Brand Created Successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getAllBrands(req,res,next){
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
                        {slug:new RegExp(search,"i")},
                        {status:new RegExp(search,"i")}
                    ]
                }
            }

            let count = await brandSvc.totalcount(filter)
            let brands = await brandSvc.getAllBrandDetails(filter,{skip:skip,limit:limit})

            res.json({
                result:brands,
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

    async updatedBrand(req,res,next){
        try {
           
            let brandId = await brandSvc.getBrandDetailsById(req.params.id)
            if(!brandId){
                next({code:403, message:"User Does not exist Any more"})
            }
            let brand = await  brandSvc.transformBrandData(req,true)
          if(!brand.image){
            brand.image = brandId.image
          }
            let updated = await brandSvc.updateBrandById(id,brand)
            if(updated.image !==brand.image){
                deleteImage("./public/uploader/"+brand.image)
               }
            res.json({
                result:updated,
                message:"Brand updated Successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getBanerById(req,res,next){
        try {
            let id = req.params.id
            let branddetails = await brandSvc.getBrandDetailsById(id)
            res.json({
                result:branddetails,
                message:"Brand Details Fetched!!",
                meta :null
            })
        } catch (exception) {
            next(exception)
        }
    } 
    
    async getBrandForHome(req,res,next){
        try {
            let limit = req.query.limit ?? 10
            let brandDetails = await brandSvc.getBrandForHomeDetails(limit)

            res.json({
                result : brandDetails,
                message:" Baner details Fecthed..",
                 meta : null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async  deleteBrand(req,res,next){
        try {
            let brand = await brandSvc.deleteBrandById(req.params.id)
    
            if(!brand){
                next({code:404, message:"Brand Does not exist"})
            }else{
                deleteImage("./public/uploader/"+brand.image)
                res.json({
                    result:brand,
                    message:"Brand Deleted Successfully"
                })
            }
        } catch (exception) {
            throw exception
        }
    }

    async getBrandBySlug(req,res,next){
        try {
            let slug = req.params.slug
            let brand = await brandSvc.getBrandDetailsBySlug(slug)

            res.json({
                result:brand,
                message:"Bradn Data fetched",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
}
    
const brandCtrl = new BrandController()
module.exports = brandCtrl