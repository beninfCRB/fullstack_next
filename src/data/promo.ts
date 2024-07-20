import { db } from "@/lib/db"

export async function GetPromo() {
    try {
        const data = await db.promo.findMany()

        return data
    } catch (error) {
        return null
    }
}

export async function GetPromoLive() {
    try {
        const data = await db.promo.findMany({
            where: {
                startDate: {
                    lte: new Date(),
                },
                endDate: {
                    gte: new Date(),
                },
            }
        })

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