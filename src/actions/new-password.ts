"use server"

import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { NewPasswordSchemaType } from "@/schemas/auth"
import bcrypt from "bcryptjs"

export default async function newPassword(values: NewPasswordSchemaType, token: string) {
    const existingToken = await getPasswordResetTokenByToken(token)
    const { password } = values

    if (!existingToken) {
        return { error: "Token does not exist!" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
        return { error: "Token has expired!" }
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return { error: "Email does not exist!" }
    }

    const hashPassword = await bcrypt.hash(password, 10)

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashPassword,
            email: existingToken.email
        }
    })

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return { success: "email verified!" }
}