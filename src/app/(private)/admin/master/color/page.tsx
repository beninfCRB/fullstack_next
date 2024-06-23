import { DeleteColor } from '@/actions/color'
import { ColorForm } from '@/components/admin/master/color/form'
import { ColorTable } from '@/components/admin/master/color/table'
import { ColorType } from '@/components/admin/master/color/type'
import { GetColor, GetColorID } from '@/data/color'


export default async function TypePage() {
    const data = await GetColor() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteColor(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetColorID(id)
        const data: ColorType = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <ColorForm getID={getData} />
                <ColorTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

