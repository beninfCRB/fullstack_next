"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ModelDimentionSchema, ModelDimentionSchemaType } from "@/schemas/model-dimention";
import { ResponseStatic } from "@/static/reponse";

export async function PostModelDimention(values: ModelDimentionSchemaType) {
    try {
        const user = await auth()

        delete values.id
        const validatedFields = ModelDimentionSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.modelDimention.create({
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

export async function PutModelDimention(id: string, values: ModelDimentionSchemaType) {
    try {
        const user = await auth()
        const validatedFields = ModelDimentionSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.modelDimention.update({
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

export async function DeleteModelDimention(id: string) {
    try {
        await db.modelDimention.delete({
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