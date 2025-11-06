const checkLogin = require("../../middleware/auth.middfleware")
const checkPermission = require("../../middleware/rbac.middleware")
const uploaders = require("../../middleware/uploaders.middleware")
const validatedSchema = require("../../middleware/validator.middleware")
const bannerCtrl = require("./banner.controller")
const { createBannerSchema, updatedBannerSchema } = require("./banner.validator")

const bannerRouter = require("express").Router()
bannerRouter.get("/home-list",bannerCtrl.getBannerForHome)
bannerRouter.route("/")
    .post(checkLogin,checkPermission("admin"),uploaders.single("image"),validatedSchema(createBannerSchema),bannerCtrl.createBanner)
    .get(checkLogin,checkPermission("admin"),bannerCtrl.getAllBanners)

bannerRouter.route("/:id")
    .put(checkLogin,checkPermission("admin"),uploaders.single("image"),validatedSchema(updatedBannerSchema),bannerCtrl.updatedBanner)
    .get(checkLogin,checkPermission("admin"),bannerCtrl.getBanerById)  
    .delete(checkLogin,checkPermission("admin"),bannerCtrl.deleteBanner)

module.exports = bannerRouter