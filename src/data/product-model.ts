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

export async function GetProductModelSearch(filter?: {
    modelId?: string,
    priceStart?: number,
    priceEnd?: number,
    transmitionId?: string,
}) {
    try {
        let whereAnd = []
        if (filter?.modelId) {
            whereAnd.push({
                product: {
                    modelId: filter?.modelId
                }
            })
        }
        if (filter?.transmitionId) {
            whereAnd.push({
                transmitionId: filter?.transmitionId
            })
        }
        if (filter?.priceStart || filter?.priceEnd) {
            if (filter?.priceStart && !filter?.priceEnd) {
                whereAnd.push({
                    price: {
                        price: {
                            gte: filter?.priceStart
                        }
                    }
                })
            }
            else if (!filter?.priceStart && filter?.priceEnd) {
                whereAnd.push({
                    price: {
                        price: {
                            lte: filter?.priceEnd
                        }
                    }
                })
            }
            else {
                whereAnd.push({
                    price: {
                        price: {
                            gte: filter?.priceStart,
                            lte: filter?.priceEnd
                        }
                    }
                })
            }
        }
        const data = await db.productModel.findMany({
            where: filter ? {
                AND: whereAnd
            } : undefined,
            include: {
                product: {
                    include: {
                        model: true,
                        product_color: {
                            include: {
                                product_image: true
                            }
                        }
                    }
                },
                price: true
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