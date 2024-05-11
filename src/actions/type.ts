"use server"

import { db } from "@/lib/db";
import { TypeSchema, TypeSchemaType } from "@/schemas/type";
import { ResponseStatic } from "@/static/reponse";

export async function PostType(values: TypeSchemaType) {
    try {
        const validatedFields = TypeSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.type.create({
            data: {
                ...validatedFields.data
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

export async function PutType(id: string, values: TypeSchemaType) {
    try {
        const validatedFields = TypeSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.type.update({
            where: {
                id
            },
            data: {
                ...validatedFields.data
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

export async function Delete(id: string) {
    try {
        await db.type.delete({
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