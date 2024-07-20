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