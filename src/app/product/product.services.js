const productCtrl = require("./product.controller")
const ProductModel = require("./product.model")
const slugify = require("slugify")
class ProductServices {
     transformProductData(req, isEdit=false){
        try {
          
            let product = {
                ...req.body,
                createdBy:req.authUser,
            }

            if(!req.files && isEdit !==true){
                throw {code:401, message:"Validation failure",result:{images:"Image is required!!!"}}
            }else if(req.files){
                product["images"] = req.files.map((image)=>image.filename)
            }

            if(!isEdit){
                product.slug = slugify(product.name,{
                    replacement:"-",
                    trim:true,
                    lower:true
                })
            }
            if(product.category ){
               product.category = product.category.split(",")
            }else if(!product.category || product.category === "null" ){
                product.category = null
            }
            if(!product.brand || product.brand === "null" ){
                product.brand = null
            }
            if(!product.seller || product.seller === "null" ){
                product.seller = null
            }
            if(isEdit){
                delete product.delImage
            } 
            product["afterDiscount"]= product.price-(product.price*product.discount/100)
            return product


        } catch (exception) {
            throw exception
        }
    }

    async storeProduct(data){
        try {
            let product =  new ProductModel(data)
            return await product.save()
        } catch (exception) {
            throw exception
        }
    }

    async totalcount(filter){
        try {
            return await ProductModel.countDocuments(filter)
        } catch (exception) {
            throw exception
        }
    }

    async getAllProductDetails(filter={},paging={skip:0,limit:0}){
        try {
            let products = await ProductModel.find(filter)
                .populate("category",["status","_id","title"])
                .populate("brand",["status","_id","title"])
                .populate("seller",["status","_id","name"])
                .populate("createdBy",["role","_id","name"])
                .sort({_id:"desc"})
                .skip(paging.skip)
                .limit(paging.limit)
            return products
        } catch (exception) {
           
            throw exception
        }
    }

    async updateProductById(id,data){
        try {
            let product = await ProductModel.findByIdAndUpdate(id,{
                $set:data
            })

            return product
        } catch (exception) {
            throw exception
        }
    }

    async getProductDetailsById(id){
        try {
            let product = await ProductModel.findById(id)
            .populate("category",["status","_id","title"])
            .populate("brand",["status","_id","title"])
            .populate("seller",["status","_id","name"])
            .populate("createdBy",["role","_id","name"])
                return product
        } catch (exception) {
            console.log(exception)
            throw exception
        }
    }

    async deleteProductById(id){
        try {
            let product = await ProductModel.findByIdAndDelete(id)
            .populate("category",["status","_id","title"])
            .populate("brand",["status","_id","title"])
            .populate("seller",["status","_id","name"])
            .populate("createdBy",["role","_id","name"])
            return product
        } catch (exception) {
            throw exception
        }
    }

    async getProductForHomeDetails(limit){
        try {
            let product = await ProductModel.find({
                status:"active"
            })
            .populate("category",["status","_id","title"])
            .populate("brand",["status","_id","title"])
            .populate("seller",["status","_id","name"])
            .populate("createdBy",["role","_id","name"])
            .sort({_id:"desc"})
            .limit(limit)
            return product
        } catch (exception) {
            throw exception 
        }
    }

    async getProductDetailsBySlug(slug){
        try {
            let product = await ProductModel.findOne({
                slug:slug
            })
            .populate("category",["status","_id","title"])
            .populate("brand",["status","_id","title"])
            .populate("seller",["status","_id","name"])
            .populate("createdBy",["role","_id","name"])
            return product
        } catch (exception) {
            throw exception
        }
    }
}
const productSvc = new ProductServices()
module.exports  = productSvc