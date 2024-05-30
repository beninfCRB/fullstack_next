"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductColorSchema, ProductColorSchemaType } from "@/schemas/product-color";
import { ResponseStatic } from "@/static/reponse";

export async function PostProductColor(values: ProductColorSchemaType) {
    try {
        const user = await auth()

        delete values.id
        const validatedFields = ProductColorSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.productColor.create({
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

export async function PutProductColor(id: string, values: ProductColorSchemaType) {
    try {
        const user = await auth()
        const validatedFields = ProductColorSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.productColor.update({
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

export async function DeleteProductColor(id: string) {
    try {
        await db.productColor.delete({
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