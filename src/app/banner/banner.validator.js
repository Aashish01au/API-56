const {z} = require("zod")

let createBannerSchema = z.object({
    title:z.string().nonempty(),
    link:z.string().url().nonempty(),
    position:z.string().nonempty(),
    status:z.string().regex(/active|inactive/)
})

let updatedBannerSchema = z.object({
    title:z.string().nonempty(),
    link:z.string().url().nonempty(),
    position:z.string().nonempty(),
    status:z.string().regex(/active|inactive/)
})

module.exports = {
    createBannerSchema,
    updatedBannerSchema
}