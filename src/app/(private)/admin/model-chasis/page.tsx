import { DeleteModelChasis } from '@/actions/model-chasis'
import { ModelChasisForm } from '@/components/admin/model-chasis/form'
import { ModelChasisTable } from '@/components/admin/model-chasis/table'
import { ModelChasisType } from '@/components/admin/model-chasis/type'
import { GetFuel } from '@/data/fuel'
import { GetModelChasis, GetModelChasisID } from '@/data/model-chasis'
import { GetProductModel } from '@/data/product-model'


export default async function ModelChasisPage() {
    const data = await GetModelChasis() || []
    const productModel = await GetProductModel() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteModelChasis(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetModelChasisID(id)
        const data: Partial<ModelChasisType> = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full 2xl:w-[88%] xl:w-[85.5%] md:w-[81%] lg:w-[83%]">
            <div className='flex flex-col gap-4'>
                <ModelChasisForm
                    dataProductModel={productModel}
                    getID={getData}
                />
                <ModelChasisTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

