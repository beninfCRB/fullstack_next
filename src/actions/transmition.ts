"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { TransmitionSchema, TransmitionSchemaType } from "@/schemas/transmition";
import { ResponseStatic } from "@/static/reponse";

export async function PostTransmition(values: TransmitionSchemaType) {
    try {
        const user = await auth()

        delete values.id
        const validatedFields = TransmitionSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.transmition.create({
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

export async function PutTransmition(id: string, values: TransmitionSchemaType) {
    try {
        const user = await auth()
        const validatedFields = TransmitionSchema.safeParse(values)

        if (!validatedFields.success) {
            return { error: "Invalid Fields!" }
        }

        await db.transmition.update({
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

export async function DeleteTransmition(id: string) {
    try {
        await db.transmition.delete({
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