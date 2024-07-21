import { ProductModelType } from '@/components/admin/product/product-model/type'
import { ButtonMain } from '@/components/custom-button'
import { SkeletonCard } from '@/components/skeleton-card'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formattedPrice } from '@/utils/format-price'
import { motion } from 'framer-motion'
import { BookTypeIcon, CircleGaugeIcon, DollarSignIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent, useEffect, useState } from 'react'

interface AllProductProps {
    data: Array<ProductModelType> | []
    count?: number
    next: () => void
}

export const AllProduct: FunctionComponent<AllProductProps> = function ({ data, next, count }) {
    const [skeleton, setSkeleton] = useState<boolean>(true)
    const path = usePathname()

    useEffect(() => {
        const timer = setTimeout(() => {
            setSkeleton(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div
            className='flex w-full flex-col gap-8'
        >
            <div
                className='xl:flex xl:flex-wrap grid grid-cols-2 w-full items-center justify-stretch gap-2'
            >
                {
                    data.length > 0 ?
                        data.map((item, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Card
                                        className='shadow-md shadow-red-500'
                                    >
                                        <CardHeader>
                                            <CardTitle className='flex items-center justify-center text-red-500 text-2xl font-semibold'>{item.product?.name?.toUpperCase()}</CardTitle>
                                            <CardDescription className='flex flex-col gap-1'>
                                                {item.type?.name && <div className='flex flex-row items-center gap-1'><BookTypeIcon className="w-4 h-4" /> {item.type?.name}</div>}
                                                {item.product?.description && <div className='flex flex-row items-center gap-1'><CircleGaugeIcon className="w-4 h-4" />{item.product?.description}</div>}
                                                {item.price?.price && <div className='flex flex-row items-center gap-1'><DollarSignIcon className="w-4 h-4" />{formattedPrice(item.price?.price)}</div>}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent
                                            className='flex items-center justify-end '
                                        >
                                            <Image
                                                className='size-auto object-cover'
                                                src={item?.product?.product_color?.at(0)?.product_image?.at(0)?.path as string}
                                                about={`${item.id}`}
                                                alt=''
                                                width={150}
                                                height={100}
                                                priority={false}
                                            />
                                        </CardContent>
                                        <CardFooter
                                            className='items-center justify-center'
                                        >
                                            <ButtonMain
                                                size={"lg"}
                                                type="submit"
                                                className="rounded-full"
                                            >
                                                <Link
                                                    href={`${path}/${item?.id as string}`}
                                                >
                                                    Explore
                                                </Link>
                                            </ButtonMain>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            )
                        }) : skeleton ? <SkeletonCard /> :
                            <p className='flex items-center justify-center text-xl font-bold'>No data</p>
                }
            </div>
            <div
                className='flex w-full flex-col items-center justify-center gap-2'
            >
                <div>==== Menampilkan Sebanyak {count} Produk ====</div>
                <ButtonMain
                    size={"lg"}
                    type="submit"
                    className="rounded-full"
                    onClick={next}
                >
                    Selanjutnya
                </ButtonMain>
            </div>
        </div>
    )
}
