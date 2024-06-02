import { db } from "@/lib/db"

export async function GetModelMachine() {
    try {
        const data = await db.modelMachine.findMany({
            include: {
                product_model: {
                    include: {
                        product: true,
                        type: true,
                        transmition: true
                    }
                },
                fuel: true
            }
        })

        return data
    } catch (error) {
        return null
    }
}

export async function GetModelMachineID(id: string) {
    try {
        const data = await db.modelMachine.findFirst({
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
                },
                fuel: true
            }
        })

        return data
    } catch (error) {
        return null
    }
}