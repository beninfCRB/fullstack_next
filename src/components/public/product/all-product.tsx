import { ProductModelType } from '@/components/admin/product/product-model/type'
import { ButtonMain } from '@/components/custom-button'
import { SkeletonCard } from '@/components/skeleton-card'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formattedPrice } from '@/utils/format-price'
import Image from 'next/image'
import { FunctionComponent, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AllProductProps {
    data: Array<ProductModelType> | []
    count?: number
    next: () => void
}

export const AllProduct: FunctionComponent<AllProductProps> = function ({ data, next, count }) {
    const [skeleton, setSkeleton] = useState<boolean>(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSkeleton(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div
            className='flex flex-col gap-8'
        >
            <div
                className='xl:flex xl:flex-wrap grid grid-cols-2 items-center justify-stretch gap-2'
            >
                {
                    data.length > 0 ?
                        data.map((item, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{item.product?.name}</CardTitle>
                                            <CardDescription className='flex flex-col'>
                                                <div>{item?.type?.name}</div>
                                                {item.product?.description && <div>{item.product?.description}</div>}
                                                {item.price?.price && <div>Rp. {formattedPrice(item.price?.price)}</div>}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
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
                                                Explore
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
                className='flex flex-col items-center justify-center gap-2'
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
