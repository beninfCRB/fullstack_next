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