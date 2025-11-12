const {z} = require("zod")

let createProductSchema = z.object({
    name:z.string().min(3).nonempty(),
    description:z.string(),
    category:z.string(),
    brands:z.string(),
    price:z.string().regex(/\d/).min(1).nonempty(),
    discount:z.string().regex(/\d/).min(1).max(100).default(0),
    isFeatured:z.boolean().default(false),
    tags:z.array(z.string()),
    stock:z.string().regex(/\d/).min(0).default(0),
    status:z.string().regex(/active|inactive/)
})

let updatedProductSchema = z.object({
    name:z.string().min(3).nonempty(),
    description:z.string(),
    category:z.string(),
    brands:z.string(),
    price:z.string().regex(/\d/).min(1).nonempty(),
    discount:z.string().regex(/\d/).min(1).max(100).default(0),
    isFeatured:z.boolean().default(false),
    tags:z.array(z.string()),
    stock:z.string().regex(/\d/).min(0).default(0),
    status:z.string().regex(/active|inactive/)
})

module.exports = {
    createProductSchema,
    updatedProductSchema
}