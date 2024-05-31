import { db } from "@/lib/db"

export async function GetProductModel() {
    try {
        const data = await db.productModel.findMany({
            include: {
                product: true,
                type: true,
                transmition: true
            }
        })

        return data
    } catch (error) {
        return null
    }
}

export async function GetProductModelID(id: string) {
    try {
        const data = await db.productModel.findFirst({
            where: {
                id
            },
            include: {
                product: true,
                type: true,
                transmition: true
            }
        })

        return data
    } catch (error) {
        return null
    }
}