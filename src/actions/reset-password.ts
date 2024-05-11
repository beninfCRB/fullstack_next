"use server"

import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { ResetSchema, ResetSchemaType } from '@/schemas/auth';
import { z } from "zod";

export async function reset(values: ResetSchemaType) {
    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid email!" }
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return { error: "Email not found" }
    }

    const passwordResetToken = await generatePasswordResetToken(email)

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return { success: "Reset email sendt" }
}