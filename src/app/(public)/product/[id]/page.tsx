import { ProductDetail } from '@/components/public/product/product-detail'
import { GetProductModelID } from '@/data/product-model'
import React from 'react'

export default async function ProductIDPage(
    { params }: { params: { id: string } }
) {
    const { id } = params
    const data = await GetProductModelID(id) || {}

    return (
        <ProductDetail
            data={data}
        />
    )
}
