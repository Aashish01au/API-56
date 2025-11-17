const { deleteImage } = require("../../helpers/helpers")
const productSvc = require("./product.services")

class ProductController{
    async createProduct(req,res,next){
        try {
           
            let product = await  productSvc.transformProductData(req)
            let response = await productSvc.storeProduct(product)
            res.json({
                result:response,
                message:"Product Created Successfully",
                meta:null
            })
        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }

    async getAllProducts(req,res,next){
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
                        {name:new RegExp(search,"i")},
                        {description:new RegExp(search,"i")},
                        {tags:new RegExp(search,"i")},
                        {status:new RegExp(search,"i")}
                    ]
                }
            }

            let count = await productSvc.totalcount(filter)
            let products = await productSvc.getAllProductDetails(filter,{skip:skip,limit:limit})

            res.json({
                result:products,
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

    async updatedProduct(req,res,next){
        try {
            let productId = await productSvc.getProductDetailsById(req.params.id)
            if(!productId){
                next({code:403, message:"User Does not exist Any more"})
            }
            let product = await  productSvc.transformProductData(req,true)    
            product.images = [...productId.images,...product.images]  
            let delImage = req.body.delImage
            let updatedImages = []
            if(delImage){
                delImage= delImage.split(",")
                updatedImages = product.images.filter((image)=>!delImage.includes(image))
                product.images = updatedImages
                delImage.map((item)=>{
                    deleteImage(("./public/uploader/"+item))
                })
            }
                
            let updated = await productSvc.updateProductById(productId,product)
            res.json({
                result:updated,
                message:"Product updated Successfully",
                meta:null
            })
        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }

    async getBanerById(req,res,next){
        try {
            let id = req.params.id
            let productdetails = await productSvc.getProductDetailsById(id)
            res.json({
                result:productdetails,
                message:"Product Details Fetched!!",
                meta :null
            })
        } catch (exception) {
            next(exception)
        }
    } 
    
    async getProductForHome(req,res,next){
        try {
            let limit = req.query.limit ?? 10
            let productDetails = await productSvc.getProductForHomeDetails(limit)

            res.json({
                result : productDetails,
                message:" Baner details Fecthed..",
                 meta : null
            })
        } catch (exception) {
            next(exception)
        }
    }

    async  deleteProduct(req,res,next){
        try {
            let product = await productSvc.deleteProductById(req.params.id)
    
            if(!product){
                next({code:404, message:"Product Does not exist"})
            }else{
                product.images.map((item)=>{
                    deleteImage(("./public/uploader/"+item))
                })
                res.json({
                    result:product,
                    message:"Product Deleted Successfully"
                })
            }
        } catch (exception) {
            throw exception
        }
    }

    async getProductBySlug(req,res,next){
        try {
            let slug = req.params.slug
            let product = await productSvc.getProductDetailsBySlug(slug)

            res.json({
                result:product,
                message:"Bradn Data fetched",
                meta:null
            })
        } catch (exception) {
            next(exception)
        }
    }
}
    
const productCtrl = new ProductController()
module.exports = productCtrl