import { DeletePromo } from '@/actions/promo'
import { PromoForm } from '@/components/admin/promo/form'
import { PromoTable } from '@/components/admin/promo/table'
import { PromoType } from '@/components/admin/promo/type'
import { GetPromo, GetPromoID } from '@/data/promo'


export default async function PromoPage() {
    const data = await GetPromo() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeletePromo(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetPromoID(id)
        const data: PromoType = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <PromoForm
                    getID={getData}
                />
                <PromoTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

