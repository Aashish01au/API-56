const categoryCtrl = require("./category.controller")
const CategoryModel = require("./category.model")
const slugify = require("slugify")
class CategoryServices {
     transformCategoryData(req, isEdit=false){
        try {
          
            let category = {
                ...req.body,
                createdBy:req.authUser,
            }

            if(!req.file && isEdit !==true){
                throw {code:401, message:"Validation failure",result:{image:"Image is required!!!"}}
            }else if(req.file){
                category["image"] = req.file.filename
            }

            if(!isEdit){
                category.slug = slugify(category.title,{
                    replacement:"-",
                    trim:true,
                    lower:true
                })
            }
            if(category.brands ){
               category.brands = category.brands.split(",")
            }else if(!category.brands || category.brands === "null" ){
                category.brands = null
            }
            if(!category.parent || category.parent === "null" ){
                category.parent = null
            }
            return category


        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }

    async storeCategory(data){
        try {
            let category =  new CategoryModel(data)
            return await category.save()
        } catch (exception) {
            throw exception
        }
    }

    async totalcount(filter){
        try {
            return await CategoryModel.countDocuments(filter)
        } catch (exception) {
            throw exception
        }
    }

    async getAllCategoryDetails(filter={},paging={skip:0,limit:0}){
        try {
            let categorys = await CategoryModel.find(filter)
                .populate("parent",["status","_id","title"])
                .populate("brands",["status","_id","title"])
                .populate("createdBy",["role","_id","name"])
                .sort({_id:"desc"})
                .skip(paging.skip)
                .limit(paging.limit)
            return categorys
        } catch (exception) {
           
            throw exception
        }
    }

    async updateCategoryById(id,data){
        try {
            let category = await CategoryModel.findByIdAndUpdate(id,{
                $set:data
            })

            return category
        } catch (exception) {
            throw exception
        }
    }

    async getCategoryDetailsById(id){
        try {
            let category = await CategoryModel.findById(id)
            .populate("parent",["status","_id","title"])
            .populate("brands",["status","_id","title"])
            .populate("createdBy",["role","_id","name"])
                return category
        } catch (exception) {
            throw exception
        }
    }

    async deleteCategoryById(id){
        try {
            let category = await CategoryModel.findByIdAndDelete(id)
            .populate("parent",["status","_id","title"])
            .populate("brands",["status","_id","title"])
            .populate("createdBy",["role","_id","name"])
            return category
        } catch (exception) {
            throw exception
        }
    }

    async getCategoryForHomeDetails(limit){
        try {
            let category = await CategoryModel.find({
                status:"active"
            })
            .populate("parent",["status","_id","title"])
            .populate("brands",["status","_id","title"])
            .populate("createdBy",["role","_id","name"])
            .sort({_id:"desc"})
            .limit(limit)
            return category
        } catch (exception) {
            throw exception 
        }
    }

    async getCategoryDetailsBySlug(slug){
        try {
            let category = await CategoryModel.findOne({
                slug:slug
            })
            .populate("parent",["status","_id","title"])
            .populate("brands",["status","_id","title"])
            .populate("createdBy",["role","_id","name"])
            return category
        } catch (exception) {
            throw exception
        }
    }
}
const categorySvc = new CategoryServices()
module.exports  = categorySvc