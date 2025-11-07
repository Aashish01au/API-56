const authRouter = require("../app/auth/auth.router")
const bannerRouter = require("../app/banner/banner.router")
const brandRouter = require("../app/brand/brand.router")
const categoryRouter = require("../app/category/category.router")

const router = require("express").Router()

router.use("/auth",authRouter)
router.use("/banner",bannerRouter)
router.use("/brand",brandRouter)
router.use("/category",categoryRouter)

module.exports = router