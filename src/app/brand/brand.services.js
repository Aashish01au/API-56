const brandCtrl = require("./brand.controller")
const BrandModel = require("./brand.model")
const slugify = require("slugify")
class BrandServices {
     transformBrandData(req, isEdit=false){
        try {
          
            let brand = {
                ...req.body,
                createdBy:req.authUser
            }

            if(!req.file && isEdit !==true){
                throw {code:401, message:"Validation failure",result:{image:"Image is required!!!"}}
            }else if(req.file){
                brand["image"] = req.file.filename
            }

            if(!isEdit){
                brand.slug = slugify(brand.title,{
                    replacement:"-",
                    trim:true,
                    lower:true
                })
            }
            return brand


        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }

    async storeBrand(data){
        try {
            let brand =  new BrandModel(data)
            return await brand.save()
        } catch (exception) {
            throw exception
        }
    }

    async totalcount(filter){
        try {
            return await BrandModel.countDocuments(filter)
        } catch (exception) {
            throw exception
        }
    }

    async getAllBrandDetails(filter={},paging={skip:0,limit:0}){
        try {
            let brands = await BrandModel.find(filter)
                .populate("createdBy",["role","_id","name"])
                .sort({_id:"desc"})
                .skip(paging.skip)
                .limit(paging.limit)
            return brands
        } catch (exception) {
            throw exception
        }
    }

    async updateBrandById(id,data){
        try {
            let brand = await BrandModel.findByIdAndUpdate(id,{
                $set:data
            })

            return brand
        } catch (exception) {
            throw exception
        }
    }

    async getBrandDetailsById(id){
        try {
            let brand = await BrandModel.findById(id)
                .populate("createdBy",["role","_id","name"])
            
                return brand
        } catch (exception) {
            throw exception
        }
    }

    async deleteBrandById(id){
        try {
            let brand = await BrandModel.findByIdAndDelete(id)
            return brand
        } catch (exception) {
            throw exception
        }
    }

    async getBrandForHomeDetails(limit){
        try {
            let brand = await BrandModel.find({
                status:"active"
            })
            .populate("createdBy",["role","_id","name"])
            .sort({_id:"desc"})
            .limit(limit)
            return brand
        } catch (exception) {
            throw exception 
        }
    }

    async getBrandDetailsBySlug(slug){
        try {
            let brand = await BrandModel.findOne({
                slug:slug
            })
            return brand
        } catch (exception) {
            throw exception
        }
    }
}
const brandSvc = new BrandServices()
module.exports  = brandSvc