import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().min(2, {
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required."
    })
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
    email: z.string().min(2, {
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required."
    }),
    username: z.string().min(2, {
        message: "Username is required."
    })
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const ResetSchema = z.object({
    email: z.string().min(2, {
        message: "Email is required",
    })
})

export type ResetSchemaType = z.infer<typeof ResetSchema>

export const NewPasswordSchema = z.object({
    password: z.string().min(1, {
        message: "Password is required."
    }),
})

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>

