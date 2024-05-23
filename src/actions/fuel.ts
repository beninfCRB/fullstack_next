"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { FuelSchema, FuelSchemaType } from "@/schemas/fuel";
import { ResponseStatic } from "@/static/reponse";

export async function PostFuel(values: FuelSchemaType) {
    try {
        const user = await auth()

        delete values.id
        const validatedFields = FuelSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.fuel.create({
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

export async function PutFuel(id: string, values: FuelSchemaType) {
    try {
        const user = await auth()
        const validatedFields = FuelSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.fuel.update({
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

export async function DeleteFuel(id: string) {
    try {
        await db.fuel.delete({
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