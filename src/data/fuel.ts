import { db } from "@/lib/db"

export async function GetFuel() {
    try {
        const data = await db.fuel.findMany()

        return data
    } catch (error) {
        return null
    }
}

export async function GetFuelID(id: string) {
    try {
        const data = await db.fuel.findFirst({
            where: {
                id
            }
        })

        return data
    } catch (error) {
        return null
    }
}