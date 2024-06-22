import { db } from "@/lib/db"

export async function GetPromo() {
    try {
        const data = await db.promo.findMany()

        return data
    } catch (error) {
        return null
    }
}

export async function GetPromoID(id: string) {
    try {
        const data = await db.promo.findFirst({
            where: {
                id
            }
        })

        return data
    } catch (error) {
        return null
    }
}