import { db } from "@/lib/db"

export async function GetProduct() {
    try {
        const data = await db.product.findMany()

        return data
    } catch (error) {
        return null
    }
}

export async function GetProductID(id: string) {
    try {
        const data = await db.product.findFirst({
            where: {
                id
            }
        })

        return data
    } catch (error) {
        return null
    }
}