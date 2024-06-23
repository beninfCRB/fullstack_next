import { DeleteType } from '@/actions/type'
import { TypeForm } from '@/components/admin/master/type/form'
import { TypeTable } from '@/components/admin/master/type/table'
import { TypeType } from '@/components/admin/master/type/type'
import { GetType, GetTypeID } from '@/data/type'


export default async function TypePage() {
    const data = await GetType() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteType(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetTypeID(id)
        const data: TypeType = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <TypeForm getID={getData} />
                <TypeTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

