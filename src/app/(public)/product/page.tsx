import { FilterProduct } from '@/components/public/product/show-product';
import { GetModel } from '@/data/model';
import { GetProductModelSearch } from '@/data/product-model';
import { GetTransmition } from '@/data/transmition';

export default async function ProductPage() {
    const fetch = async (v?: any) => {
        "use server"
        if (v) {
            return await GetProductModelSearch(v)
        }
        return await GetProductModelSearch({})
    }
    const model = await GetModel() || []
    const transmition = await GetTransmition() || []

    return (
        <FilterProduct
            model={model}
            transmition={transmition}
            dataFunc={fetch}
        />
    )
}
