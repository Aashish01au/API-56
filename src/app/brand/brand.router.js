const checkLogin = require("../../middleware/auth.middfleware")
const checkPermission = require("../../middleware/rbac.middleware")
const uploaders = require("../../middleware/uploaders.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const brandCtrl = require("./brand.controller")
const { createBrandSchema, updatedBrandSchema } = require("./brand.validator")

const brandRouter = require("express").Router()
brandRouter.get("/home-list",brandCtrl.getBrandForHome)
brandRouter.get("/:slug/slug",brandCtrl.getBrandBySlug)
brandRouter.route("/")
    .post(checkLogin,checkPermission("admin"),uploaders.single("image"),validatedSchema(createBrandSchema),brandCtrl.createBrand)
    .get(checkLogin,checkPermission("admin"),brandCtrl.getAllBrands)

brandRouter.route("/:id")
    .put(checkLogin,checkPermission("admin"),uploaders.single("image"),validatedSchema(updatedBrandSchema),brandCtrl.updatedBrand)
    .get(checkLogin,checkPermission("admin"),brandCtrl.getBanerById)  
    .delete(checkLogin,checkPermission("admin"),brandCtrl.deleteBrand)

module.exports = brandRouter