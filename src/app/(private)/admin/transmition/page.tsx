import { DeleteTransmition } from '@/actions/transmition'
import { TransmitionForm } from '@/components/admin/transmition/form'
import { TransmitionTable } from '@/components/admin/transmition/table'
import { TransmitionType } from '@/components/admin/transmition/type'
import { GetTransmition, GetTransmitionID } from '@/data/transmition'


export default async function TransmitionPage() {
    const data = await GetTransmition() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteTransmition(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetTransmitionID(id)
        const data: TransmitionType = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <TransmitionForm getID={getData} />
                <TransmitionTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

