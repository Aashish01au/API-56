const checkLogin = require("../../middleware/auth.middfleware")
const checkPermission = require("../../middleware/rbac.middleware")
const uploaders = require("../../middleware/uploaders.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const categoryCtrl = require("./category.controller")
const { createCategorySchema, updatedCategorySchema } = require("./category.validator")

const categoryRouter = require("express").Router()
categoryRouter.get("/home-list",categoryCtrl.getCategoryForHome)
categoryRouter.get("/:slug/slug",categoryCtrl.getCategoryBySlug)
categoryRouter.route("/")
    .post(checkLogin,checkPermission("admin"),uploaders.single("image"),validatedSchema(createCategorySchema),categoryCtrl.createCategory)
    .get(checkLogin,checkPermission("admin"),categoryCtrl.getAllCategorys)

categoryRouter.route("/:id")
    .put(checkLogin,checkPermission("admin"),uploaders.single("image"),validatedSchema(updatedCategorySchema),categoryCtrl.updatedCategory)
    .get(checkLogin,checkPermission("admin"),categoryCtrl.getBanerById)  
    .delete(checkLogin,checkPermission("admin"),categoryCtrl.deleteCategory)

module.exports = categoryRouter