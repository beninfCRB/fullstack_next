import { DeleteCarouselImage } from '@/actions/carousel-image'
import { CarouselImageForm } from '@/components/admin/carousel-image/form'
import { CarouselImageTable } from '@/components/admin/carousel-image/table'
import { CarouselImageType } from '@/components/admin/carousel-image/type'
import { GetCarouselImage, GetCarouselImageID } from '@/data/carousel-image'


export default async function CarouselImagePage() {
    const data = await GetCarouselImage() || []

    const onDelete = async (id: string) => {
        "use server"
        return await DeleteCarouselImage(id)
    }

    const getData = async (id: string) => {
        "use server"
        const obj = await GetCarouselImageID(id)
        const data: CarouselImageType = { ...obj }
        return data
    }

    return (
        <div className="gap-6 w-full">
            <div className='flex flex-col gap-4'>
                <CarouselImageForm
                    getID={getData}
                />
                <CarouselImageTable
                    data={data}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}

