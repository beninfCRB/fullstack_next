import { db } from "@/lib/db"

export async function GetTransmition() {
    try {
        const data = await db.transmition.findMany()

        return data
    } catch (error) {
        return null
    }
}

export async function GetTransmitionID(id: string) {
    try {
        const data = await db.transmition.findFirst({
            where: {
                id
            }
        })

        return data
    } catch (error) {
        return null
    }
}