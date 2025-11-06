const {z} = require("zod")
let registerUserSchemaa = z.object({
    name:z.string().min(3).max(35).nonempty(),
    email:z.string().email().nonempty(),
    phone:z.string().nonempty(),
    address:z.string().nonempty(),
    role:z.string().regex(/admin|seller|customer/)

})

let activateUserSchema = z.object({
    password:z.string().nonempty(),
    confirmPassword:z.string().nonempty()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

let loginSchema = z.object({
    email:z.string().email().nonempty()
})
let forgetpasswordSchema = z.object({
    email:z.string().email().nonempty()
})

let resetPasswordSchema = z.object({
    password:z.string().nonempty(),
    confirmPassword:z.string().nonempty()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
module.exports = {
    registerUserSchemaa,
    activateUserSchema,
    loginSchema,
    forgetpasswordSchema,
    resetPasswordSchema
}