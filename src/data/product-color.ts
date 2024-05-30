import { db } from "@/lib/db"

export async function GetProductColor() {
    try {
        const data = await db.productColor.findMany({
            select: {
                product: true,
                color: true
            }
        })

        return data
    } catch (error) {
        return null
    }
}

export async function GetProductColorID(id: string) {
    try {
        const data = await db.productColor.findFirst({
            where: {
                id
            },
            select: {
                product: true,
                color: true
            }
        })

        return data
    } catch (error) {
        return null
    }
}