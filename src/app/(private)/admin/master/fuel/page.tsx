import { DeleteFuel } from '@/actions/fuel'
import { FuelForm } from '@/components/admin/master/fuel/form'
import { FuelTable } from '@/components/admin/master/fuel/table'
import { FuelType } from '@/components/admin/master/fuel/type'
import { GetFuel, GetFuelID } from '@/data/fuel'


export default async function FuelPage() {
    const data = await GetFuel() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteFuel(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetFuelID(id)
        const data: FuelType = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <FuelForm getID={getData} />
                <FuelTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

