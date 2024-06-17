import { db } from "@/lib/db"

export async function GetModelChasis() {
    try {
        const data = await db.modelChasis.findMany({
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

export async function GetModelChasisID(id: string) {
    try {
        const data = await db.modelChasis.findFirst({
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