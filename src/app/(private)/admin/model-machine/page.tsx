import { DeleteModelMachine } from '@/actions/model-machine'
import { ModelMachineForm } from '@/components/admin/model-machine/form'
import { ModelMachineTable } from '@/components/admin/model-machine/table'
import { ModelMachineType } from '@/components/admin/model-machine/type'
import { GetFuel } from '@/data/fuel'
import { GetModelMachine, GetModelMachineID } from '@/data/model-machine'
import { GetProductModel } from '@/data/product-model'


export default async function ModelMachinePage() {
    const data = await GetModelMachine() || []
    const productModel = await GetProductModel() || []
    const fuel = await GetFuel() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteModelMachine(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetModelMachineID(id)
        const data: ModelMachineType = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <ModelMachineForm
                    dataFuel={fuel}
                    dataProductModel={productModel}
                    getID={getData}
                />
                <ModelMachineTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

