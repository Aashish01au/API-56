const {z} = require("zod")

let createCategorySchema = z.object({
    title:z.string().min(3).nonempty(),
    description:z.string(),
    parent:z.string(),
    brands:z.string(),
    status:z.string().regex(/active|inactive/)
})

let updatedCategorySchema = z.object({
    title:z.string().min(3).nonempty(),
    description:z.string(),
    parent:z.string(),
    brands:z.string(),
    status:z.string().regex(/active|inactive/)
})

module.exports = {
    createCategorySchema,
    updatedCategorySchema
}