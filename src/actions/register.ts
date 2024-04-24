"use server"

import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export async function register(values: z.infer<typeof LoginSchema>) {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password, username } = validatedFields.data
    const hashPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email already exists!" }
    }

    await db.user.create({
        data: {
            email,
            password: hashPassword,
            username
        }
    })

    return {
        data: {
            email,
            username
        },
        success: "Register Success!"
    }
}