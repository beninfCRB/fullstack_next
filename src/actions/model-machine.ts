"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ModelMachineSchema, ModelMachineSchemaType } from "@/schemas/model-machine";
import { ResponseStatic } from "@/static/reponse";

export async function PostModelMachine(values: ModelMachineSchemaType) {
    try {
        const user = await auth()

        delete values.id
        const validatedFields = ModelMachineSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.modelMachine.create({
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

export async function PutModelMachine(id: string, values: ModelMachineSchemaType) {
    try {
        const user = await auth()
        const validatedFields = ModelMachineSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.modelMachine.update({
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

export async function DeleteModelMachine(id: string) {
    try {
        await db.modelMachine.delete({
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