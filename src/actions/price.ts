"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { PriceSchema, PriceSchemaType } from "@/schemas/price";
import { ResponseStatic } from "@/static/reponse";

export async function PostPrice(values: PriceSchemaType) {
    try {
        const user = await auth()

        delete values.id
        const validatedFields = PriceSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.price.create({
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

export async function PutPrice(id: string, values: PriceSchemaType) {
    try {
        const user = await auth()
        const validatedFields = PriceSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.price.update({
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

export async function DeletePrice(id: string) {
    try {
        await db.price.delete({
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