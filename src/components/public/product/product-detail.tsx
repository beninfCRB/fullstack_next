"use client"

import { ProductModelType } from '@/components/admin/product/product-model/type'
import Image from 'next/image'
import React, { FunctionComponent } from 'react'
import { motion } from 'framer-motion'
import { produkVariants } from '@/utils/animate'
import { Carousel, CarouselMainContainer, CarouselThumbsContainer, SliderMainItem, SliderThumbItem } from '@/components/ui/carousel-extension'
import { ColorPicker } from '@/components/ui/color-picker-input'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface ProductDetailProps {
    data?: ProductModelType
}

export const ProductDetail: FunctionComponent<ProductDetailProps> = function ({ ...props }) {
    const { data } = props
    console.log('data====>', data);

    return (
        <div
            className='flex flex-col items-center justify-center w-full mt-10 space-y-4'
        >
            <div className='text-4xl font-bold font-sans text-red-500 w-full text-center'>{data?.product?.name?.toUpperCase()}</div>
            <motion.div
                initial="offscreen"
                whileInView={"onscreen"}
                variants={produkVariants}
                className="w-full"
            >
                <Carousel orientation="vertical" className="flex flex-col items-center justify-center gap-2 px-10 pt-8">
                    <div
                        className="block text-center bg-red-500 w-full rounded-lg"
                    >
                        <span className="text-2xl italic font-bold decoration-red-500 text-white mb-8">WARNA</span>
                        <CarouselThumbsContainer className="h-50 basis-1/4 flex flex-row flex-wrap">
                            {data?.product?.product_color?.map((item, index) => {
                                return item?.product_image?.map((detail_item, detail_index) =>
                                (
                                    <SliderThumbItem
                                        key={index}
                                        index={index}
                                        className="rounded-md flex-1 p-2 flex flex-col w-full"
                                    >
                                        <div>
                                            <h1 className={`text-[${item?.color?.color}] font-extrabold text-lg text-nowrap border-red-500`}>{item?.color?.name}</h1>
                                        </div>
                                        <div className="flex items-center justify-center border cursor-pointer w-full p-2 rounded-xl">
                                            <ColorPicker
                                                className='border-red-500'
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
                    <div className="relative basis-3/4 h-[15rem] lg:h-[25rem]">
                        <CarouselMainContainer className="h-[18rem] lg:h-[30rem]">
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
                                                    className='lg:size-full lg:object-cover rounded-lg'
                                                    src={detail_item?.path as string}
                                                    about={`${detail_item?.id}`}
                                                    alt=''
                                                    width={600}
                                                    height={300}
                                                    priority={false}
                                                />
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
            <div
                className='w-full p-8 mt-[-4rem]'
            >
                <Card
                    className='shadow-md shadow-red-500'
                >
                    <CardHeader
                        className='flex items-center justify-center'
                    >
                        <div
                            className='text-2xl font-bold text-red-500'
                        >SPESIFIKASI</div>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is it styled?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It comes with default styles that matches the other
                                    components&apos; aesthetic.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Is it animated?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It&apos;s animated by default, but you can disable it if you
                                    prefer.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
