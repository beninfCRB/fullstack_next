import { db } from "@/lib/db"

export async function GetColor() {
    try {
        const data = await db.color.findMany()

        return data
    } catch (error) {
        return null
    }
}

export async function GetColorID(id: string) {
    try {
        const data = await db.color.findFirst({
            where: {
                id
            }
        })

        return data
    } catch (error) {
        return null
    }
}