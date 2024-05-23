"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductSchema, ProductSchemaType } from "@/schemas/product";
import { ResponseStatic } from "@/static/reponse";

export async function PostProduct(values: ProductSchemaType) {
    try {
        const user = await auth()

        delete values.id
        const validatedFields = ProductSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.product.create({
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

export async function PutProduct(id: string, values: ProductSchemaType) {
    try {
        const user = await auth()
        const validatedFields = ProductSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.product.update({
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

export async function DeleteProduct(id: string) {
    try {
        await db.product.delete({
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