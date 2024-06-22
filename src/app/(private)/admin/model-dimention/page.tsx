import { DeleteModelDimention } from '@/actions/model-dimention'
import { ModelDimentionForm } from '@/components/admin/model-dimention/form'
import { ModelDimentionTable } from '@/components/admin/model-dimention/table'
import { ModelDimentionType } from '@/components/admin/model-dimention/type'
import { GetFuel } from '@/data/fuel'
import { GetModelDimention, GetModelDimentionID } from '@/data/model-dimention'
import { GetProductModel } from '@/data/product-model'


export default async function ModelDimentionPage() {
    const data = await GetModelDimention() || []
    const productModel = await GetProductModel() || []
    const fuel = await GetFuel() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteModelDimention(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetModelDimentionID(id)
        const data: Partial<ModelDimentionType> = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full 2xl:w-[88%] xl:w-[85.5%] md:w-[81%] lg:w-[83%]">
            <div className='flex flex-col gap-4'>
                <ModelDimentionForm
                    dataFuel={fuel}
                    dataProductModel={productModel}
                    getID={getData}
                />
                <ModelDimentionTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

