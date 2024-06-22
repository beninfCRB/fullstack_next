import { db } from "@/lib/db"

export async function GetModel() {
    try {
        const data = await db.model.findMany({
            include: {
                product: true
            }
        })

        return data
    } catch (error) {
        return null
    }
}

export async function GetModelID(id: string) {
    try {
        const data = await db.model.findFirst({
            where: {
                id
            },
            include: {
                product: true
            }
        })

        return data
    } catch (error) {
        return null
    }
}