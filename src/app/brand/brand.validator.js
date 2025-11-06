const {z} = require("zod")

let createBrandSchema = z.object({
    title:z.string().min(3).nonempty(),
    status:z.string().regex(/active|inactive/)
})

let updatedBrandSchema = z.object({
    title:z.string().min(3).nonempty(),
    status:z.string().regex(/active|inactive/)
})

module.exports = {
    createBrandSchema,
    updatedBrandSchema
}