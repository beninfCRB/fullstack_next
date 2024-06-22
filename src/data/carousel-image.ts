import { db } from "@/lib/db"

export async function GetCarouselImage() {
    try {
        const data = await db.carouselImage.findMany()

        return data
    } catch (error) {
        return null
    }
}

export async function GetCarouselImageID(id: string) {
    try {
        const data = await db.carouselImage.findFirst({
            where: {
                id
            }
        })

        return data
    } catch (error) {
        return null
    }
}