import { db } from "@/lib/db"

export async function GetPrice() {
    try {
        const data = await db.price.findMany({
            include: {
                product_model: {
                    include: {
                        product: true,
                        type: true
                    }
                }
            }
        })

        return data
    } catch (error) {
        return null
    }
}

export async function GetPriceID(id: string) {
    try {
        const data = await db.price.findFirst({
            where: {
                id
            },
            include: {
                product_model: {
                    include: {
                        product: true,
                        type: true
                    }
                }
            }
        })

        return data
    } catch (error) {
        return null
    }
}