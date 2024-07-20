"use client"

import { ProductModelType } from '@/components/admin/product/product-model/type'
import Image from 'next/image'
import React, { FunctionComponent } from 'react'
import { motion } from 'framer-motion'
import { produkVariants } from '@/utils/animate'
import { Carousel, CarouselMainContainer, CarouselThumbsContainer, SliderMainItem, SliderThumbItem } from '@/components/ui/carousel-extension'
import { ColorPicker } from '@/components/ui/color-picker-input'

interface ProductDetailProps {
    data?: ProductModelType
}

export const ProductDetail: FunctionComponent<ProductDetailProps> = function ({ ...props }) {
    const { data } = props
    console.log('data====>', data);

    return (
        <div
            className='flex flex-col items-center justify-center w-full mt-10'
        >
            <div className='text-2xl font-bold font-sans text-red-500 w-full text-center'>{data?.product?.name?.toUpperCase()}</div>
            <motion.div
                initial="offscreen"
                whileInView={"onscreen"}
                variants={produkVariants}
                className="w-full"
            >
                <Carousel orientation="vertical" className="flex flex-col items-center justify-center gap-2 px-10 py-8">
                    <div
                        className="block text-center bg-slate-500 w-full"
                    >
                        <span className="text-lg italic font-bold decoration-red-500 text-white mb-8">Warna</span>
                        <CarouselThumbsContainer className="h-60 basis-1/4 flex flex-row flex-wrap">
                            {data?.product?.product_color?.map((item, index) => {
                                return item?.product_image?.map((detail_item, detail_index) =>
                                (
                                    <SliderThumbItem
                                        key={index}
                                        index={index}
                                        className="rounded-md flex-1 p-2 flex flex-col w-full"
                                    >
                                        <div>
                                            <h1 className={`text-[${item?.color?.code}] font-extrabold text-lg text-nowrap`}>{item?.color?.name}</h1>
                                        </div>
                                        <div className="flex items-center justify-center border cursor-pointer w-full p-2">
                                            <ColorPicker
                                                onChange={() => { }}
                                                value={item?.color?.color as string}
                                                disabled
                                            />
                                        </div>
                                    </SliderThumbItem>
                                )
                                )
                            })}
                        </CarouselThumbsContainer>
                    </div>
                    <div className="relative basis-3/4 h-[25rem] lg:size-auto">
                        <CarouselMainContainer className="h-[44rem]">
                            {data?.product?.product_color?.map((item, index) => {
                                return item?.product_image?.map((detail_item, detail_index) =>
                                (
                                    <SliderMainItem
                                        key={index}
                                        className="flex justify-center rounded-md"
                                    >
                                        <motion.div
                                            transition={{
                                                ease: "linear",
                                                duration: 2,
                                                x: { duration: 1 }
                                            }}
                                        >
                                            <div
                                                className="flex flex-col text-center items-center gap-4 size-auto w-full"
                                            >
                                                <Image
                                                    className='lg:size-full object-cover rounded-lg'
                                                    src={detail_item?.path as string}
                                                    about={`${detail_item?.id}`}
                                                    alt=''
                                                    width={600}
                                                    height={200}
                                                    priority={false}
                                                />
                                                {/* <h1 className="font-bold text-4xl">{item?.name}</h1> */}
                                            </div>
                                        </motion.div>
                                    </SliderMainItem>
                                )
                                )
                            })}
                        </CarouselMainContainer>
                    </div>
                </Carousel>
            </motion.div>
        </div>
    )
}
