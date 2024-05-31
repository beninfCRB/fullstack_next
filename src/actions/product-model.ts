"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProductModelSchema, ProductModelSchemaType } from "@/schemas/product-model";
import { ResponseStatic } from "@/static/reponse";

export async function PostProductModel(values: ProductModelSchemaType) {
    try {
        const user = await auth()

        delete values.id
        const validatedFields = ProductModelSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.productModel.create({
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

export async function PutProductModel(id: string, values: ProductModelSchemaType) {
    try {
        const user = await auth()
        const validatedFields = ProductModelSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.productModel.update({
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

export async function DeleteProductModel(id: string) {
    try {
        await db.productModel.delete({
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