import { ProductType } from "@/components/admin/product/product-main/type"
import { db } from "@/lib/db"

export async function GetProduct() {
    try {
        const data = await db.product.findMany({
            include: {
                product_model: {
                    include: {
                        price: true,
                        transmition: true,
                        model_machine: {
                            include: {
                                fuel: true
                            }
                        }
                    }
                },
                product_color: {
                    include: {
                        product_image: true
                    }
                }
            }
        })

        return data
    } catch (error) {
        return null
    }
}

export async function GetProductCarousel() {
    try {
        const data = await db.$queryRaw<any[]>`SELECT product.buildUp,product.name, CAST(price.price AS DECIMAL) AS price, transmition.name AS transmition, fuel.name AS fuel, product_image.path FROM product 
        LEFT JOIN product_model ON product.id = product_model.productId 
        LEFT JOIN price ON product_model.id = price.productModelId 
        LEFT JOIN transmition ON product_model.transmitionId = transmition.id 
        LEFT JOIN model_machine ON product_model.id = model_machine.productModelId 
        LEFT JOIN fuel ON model_machine.fuelId = fuel.id 
        LEFT JOIN product_color ON product.id = product_color.productId 
        LEFT JOIN product_image ON product_color.id = product_image.productColorId 
        GROUP BY product.id
        ORDER BY CAST(price.price AS DECIMAL) ASC`

        return data
    } catch (error) {
        return null
    }
}

export async function GetProductSearch(filter?: {
    modelId?: string,
    priceStart?: number,
    priceEnd?: number,
    transmitionId?: string,
}) {
    try {
        let whereAnd = []
        if (filter?.modelId) whereAnd.push({ modelId: filter?.modelId })
        if (filter?.priceStart || filter?.priceEnd || filter?.transmitionId) {
            whereAnd.push({
                product_model: {
                    some: {
                        OR: [
                            {
                                price: {
                                    OR: [
                                        {
                                            price: filter?.priceStart ? {
                                                gte: filter?.priceStart
                                            } : undefined
                                        },
                                        {
                                            price: filter?.priceEnd ? {
                                                lte: filter?.priceEnd
                                            } : undefined
                                        }
                                    ]
                                }
                            },
                            { transmitionId: filter?.transmitionId ? filter?.transmitionId : undefined }
                        ]
                    }
                }
            })
        }
        const data = await db.product.findMany({
            where: filter ? {
                AND: whereAnd
            } : undefined,
            include: {
                model: true,
                product_model: {
                    include: {
                        price: true,
                        transmition: true,
                        model_machine: {
                            include: {
                                fuel: true
                            }
                        }
                    }
                },
                product_color: {
                    include: {
                        product_image: true
                    }
                }
            }
        })

        return data
    } catch (error) {
        return null
    }
}

export async function GetProductID(id: string) {
    try {
        const data = await db.product.findFirst({
            where: {
                id
            },
            include: {
                product_model: {
                    include: {
                        price: true,
                        transmition: true,
                        model_machine: {
                            include: {
                                fuel: true
                            }
                        }
                    }
                },
                product_color: {
                    include: {
                        product_image: true
                    }
                }
            }
        })

        return data
    } catch (error) {
        return null
    }
}