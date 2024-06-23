import { DeleteModel } from '@/actions/model'
import { ModelForm } from '@/components/admin/master/model/form'
import { ModelTable } from '@/components/admin/master/model/table'
import { ModelType } from '@/components/admin/master/model/type'
import { GetModel, GetModelID } from '@/data/model'


export default async function ModelPage() {
    const data = await GetModel() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteModel(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetModelID(id)
        const data: Partial<ModelType> = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <ModelForm getID={getData} />
                <ModelTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

