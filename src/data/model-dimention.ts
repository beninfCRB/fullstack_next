import { db } from "@/lib/db"

export async function GetModelDimention() {
    try {
        const data = await db.modelDimention.findMany({
            include: {
                product_model: {
                    include: {
                        product: true,
                        type: true,
                        transmition: true
                    }
                }
            }
        })

        return data
    } catch (error) {
        return null
    }
}

export async function GetModelDimentionID(id: string) {
    try {
        const data = await db.modelDimention.findFirst({
            where: {
                id
            },
            include: {
                product_model: {
                    include: {
                        product: true,
                        type: true,
                        transmition: true
                    }
                }
            }
        })

        return data
    } catch (error) {
        return null
    }
}