const checkLogin = require("../../middleware/auth.middfleware")
const checkPermission = require("../../middleware/rbac.middleware")
const uploaders = require("../../middleware/uploaders.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const productCtrl = require("./product.controller")
const { createProductSchema, updatedProductSchema } = require("./product.validator")

const productRouter = require("express").Router()
productRouter.get("/home-list",productCtrl.getProductForHome)
productRouter.get("/:slug/slug",productCtrl.getProductBySlug)
productRouter.route("/")
    .post(checkLogin,checkPermission("admin"),uploaders.array("images"),validatedSchema(createProductSchema),productCtrl.createProduct)
    .get(checkLogin,checkPermission("admin"),productCtrl.getAllProducts)

productRouter.route("/:id")
    .put(checkLogin,checkPermission("admin"),uploaders.array("images"),validatedSchema(updatedProductSchema),productCtrl.updatedProduct)
    .get(checkLogin,checkPermission("admin"),productCtrl.getBanerById)  
    .delete(checkLogin,checkPermission("admin"),productCtrl.deleteProduct)

module.exports = productRouter