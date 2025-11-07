const { deleteImage } = require("../../helpers/helpers")
const categorySvc = require("./category.services")

class CategoryController{
    async createCategory(req,res,next){
        try {
           
            let category = await  categorySvc.transformCategoryData(req)
            let response = await categorySvc.storeCategory(category)
            console.log(category)
            res.json({
                result:response,
                message:"Category Created Successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getAllCategorys(req,res,next){
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

            let count = await categorySvc.totalcount(filter)
            let categorys = await categorySvc.getAllCategoryDetails(filter,{skip:skip,limit:limit})

            res.json({
                result:categorys,
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

    async updatedCategory(req,res,next){
        try {
           
            let categoryId = await categorySvc.getCategoryDetailsById(req.params.id)
            if(!categoryId){
                next({code:403, message:"User Does not exist Any more"})
            }
            let category = await  categorySvc.transformCategoryData(req,true)
          if(!category.image){
            category.image = categoryId.image
          }
            let updated = await categorySvc.updateCategoryById(id,category)
            if(updated.image !==category.image){
                deleteImage("./public/uploader/"+category.image)
               }
            res.json({
                result:updated,
                message:"Category updated Successfully",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async getBanerById(req,res,next){
        try {
            let id = req.params.id
            let categorydetails = await categorySvc.getCategoryDetailsById(id)
            res.json({
                result:categorydetails,
                message:"Category Details Fetched!!",
                meta :null
            })
        } catch (exception) {
            next(exception)
        }
    } 
    
    async getCategoryForHome(req,res,next){
        try {
            let limit = req.query.limit ?? 10
            let categoryDetails = await categorySvc.getCategoryForHomeDetails(limit)

            res.json({
                result : categoryDetails,
                message:" Baner details Fecthed..",
                 meta : null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async  deleteCategory(req,res,next){
        try {
            let category = await categorySvc.deleteCategoryById(req.params.id)
    
            if(!category){
                next({code:404, message:"Category Does not exist"})
            }else{
                deleteImage("./public/uploader/"+category.image)
                res.json({
                    result:category,
                    message:"Category Deleted Successfully"
                })
            }
        } catch (exception) {
            throw exception
        }
    }

    async getCategoryBySlug(req,res,next){
        try {
            let slug = req.params.slug
            let category = await categorySvc.getCategoryDetailsBySlug(slug)

            res.json({
                result:category,
                message:"Bradn Data fetched",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
}
    
const categoryCtrl = new CategoryController()
module.exports = categoryCtrl