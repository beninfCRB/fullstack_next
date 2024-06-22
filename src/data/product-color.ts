import { db } from "@/lib/db"

export async function GetProductColor() {
    try {
        const data = await db.productColor.findMany({
            include: {
                product: true,
                color: true,
                product_image: true
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
            include: {
                product: true,
                color: true,
                product_image: true
            }
        })

        return data
    } catch (error) {
        return null
    }
}