import { db } from "@/lib/db"

export async function GetProductImage() {
    try {
        const data = await db.productImage.findMany({
            include: {
                product_color: {
                    include: {
                        product: true,
                        color: true
                    }
                }
            }
        })

        return data
    } catch (error) {
        return null
    }
}

export async function GetProductImageID(id: string) {
    try {
        const data = await db.productImage.findFirst({
            where: {
                id
            },
            include: {
                product_color: {
                    include: {
                        product: true,
                        color: true
                    }
                }
            }
        })

        return data
    } catch (error) {
        return null
    }
}