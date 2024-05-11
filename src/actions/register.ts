"use server"

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

export async function register(values: RegisterSchemaType) {
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

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return {
        success: "Confirmation email sent!"
    }
}