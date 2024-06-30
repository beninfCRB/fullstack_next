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

export async function GetProductGroup() {
    try {
        const data = await db.$queryRaw<any>`SELECT * FROM product
        LEFT JOIN product_model ON product.id = product_model.productId
        LEFT JOIN price ON product_model.id = price.productModelId
        LEFT JOIN transmition ON product_model.id = transmition.productModelId
        LEFT JOIN model_machine ON product_model.id = model_machine.productModelId
        LEFT JOIN fuel ON model_machine.id = fuel.modelMachineId
        LEFT JOIN product_color ON product.id = product_color.productId
        LEFT JOIN product_image ON product_color.id = product_image.productColorId
        GROUP BY product.id
        `

        console.log(data);

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