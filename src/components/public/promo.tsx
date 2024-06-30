"use client"

import { promoVariants, titleVariants } from '@/utils/animate'
import { formattedDateText } from '@/utils/format-date'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import { PromoType } from '../admin/promo/type'
import { ArrowBigRightIcon } from 'lucide-react'
import { SkeletonCard } from '../skeleton-card'

interface PromoPrpops {
    data: Array<PromoType> | []
}

export const PromoComponent: FunctionComponent<PromoPrpops> = function ({ ...props }) {
    return (
        props.data?.length > 0 ? (
            <section id='promo' className='flex flex-col items-center justify-center border-2 p-4 w-full mt-8'>
                <motion.h1
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={titleVariants}
                    className="text-2xl font-bold mb-8 ml-0"
                >
                    PROMO
                </motion.h1>
                <motion.div
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={promoVariants}
                >
                    <div
                        className='flex flex-row gap-8 grid-cols-2 lg:grid-cols-4 lg:gap-0 divide-gray-300 lg:divide-x rounded-xl shadow-lg'
                    >
                        {
                            props.data?.map((item, i) => (
                                <div
                                    key={i}
                                    className='relative overflow-hidden group'
                                >
                                    <Image
                                        src={item.path as string}
                                        width={380}
                                        height={200}
                                        alt=""
                                        className='size-auto object-cover w-full rounded-2xl'
                                    />
                                    <div className='absolute top-0 p-2 bg-white text-black bg-opacity-60 backdrop-blur m-12'>
                                        <div className='flex justify-end pb-4'>
                                            <span className='text-xs'>Berlaku {formattedDateText(item.startDate)} s/d {formattedDateText(item.endDate)}</span>
                                        </div>
                                        <a className='block text-xl font-semibold' href="">{item.name}</a>
                                        <p>{item.description}</p>
                                        <a className='inline-flex items-center font-medium' href="">See Details <ArrowBigRightIcon /></a>
                                    </div>

                                    <div className='inset-0 bg-red-500 flex-col items-center justify-end md:flex absolute gap-32 pb-16 text-xl transition duration-300 ease-in-out border-b-2 group-hover:translate-y-full md:border-b-0 rounded-2xl p-1 text-white'>
                                        <span className='text-sm text-wrap font-semibold'>Berlaku {formattedDateText(item.startDate)} s/d {formattedDateText(item.endDate)}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </motion.div>
            </section>
        ) : <SkeletonCard />
    )
}
