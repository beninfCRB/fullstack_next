"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ModelChasisSchema, ModelChasisSchemaType } from "@/schemas/model-chasis";
import { ResponseStatic } from "@/static/reponse";

export async function PostModelChasis(values: ModelChasisSchemaType) {
    try {
        const user = await auth()

        delete values.id
        const validatedFields = ModelChasisSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.modelChasis.create({
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

export async function PutModelChasis(id: string, values: ModelChasisSchemaType) {
    try {
        const user = await auth()
        const validatedFields = ModelChasisSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.modelChasis.update({
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

export async function DeleteModelChasis(id: string) {
    try {
        await db.modelChasis.delete({
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