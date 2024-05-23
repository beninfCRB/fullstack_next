"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ColorSchema, ColorSchemaType } from "@/schemas/color";
import { ResponseStatic } from "@/static/reponse";

export async function PostColor(values: ColorSchemaType) {
    try {
        const user = await auth()

        delete values.id
        const validatedFields = ColorSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.color.create({
            data: {
                ...validatedFields.data,
                createdBy: user?.user?.id,
                updatedBy: user?.user?.id
            }
        })

        return { success: ResponseStatic.Success.Insert }
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        return { error: ResponseStatic.Error.Insert }
    }
}

export async function PutColor(id: string, values: ColorSchemaType) {
    try {
        const user = await auth()
        const validatedFields = ColorSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.color.update({
            where: {
                id
            },
            data: {
                ...validatedFields.data,
                updatedBy: user?.user.id
            }
        })

        return { success: ResponseStatic.Success.Update }
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        return { error: ResponseStatic.Error.Update }
    }
}

export async function DeleteColor(id: string) {
    try {
        await db.color.delete({
            where: {
                id
            }
        })

        return { success: ResponseStatic.Success.Delete }
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        return { error: ResponseStatic.Error.Delete }
    }
}