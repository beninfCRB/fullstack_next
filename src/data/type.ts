import { db } from "@/lib/db"

export async function GetType() {
    try {
        const data = await db.type.findMany()

        return data
    } catch (error) {
        return null
    }
}

export async function GetTypeID(id: string) {
    try {
        const data = await db.type.findFirst({
            where: {
                id
            }
        })

        return data
    } catch (error) {
        return null
    }
}