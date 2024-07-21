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
                                <AccordionTrigger className='text-xl'>DIMENSI</AccordionTrigger>
                                <AccordionContent
                                    className='flex flex-col gap-2'
                                >
                                    {
                                        data?.model_dimention?.length ?
                                            data?.model_dimention?.map((item, index) => (
                                                <ul className='flex flex-col text-md uppercase space-y-1'>
                                                    <li className='flex items-center justify-between bg-slate-500 text-white p-2 rounded-lg'>Overall Panjang / Length <span>{item?.length ? Number(item?.length).toFixed(2) : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-red-500 text-white p-2 rounded-lg'>Overall Lebar / Width <span>{item?.width ? Number(item?.width).toFixed(2) : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-slate-500 text-white p-2 rounded-lg'>Overall Tinggi / Height <span>{item?.height ? Number(item?.height).toFixed(2) : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-red-500 text-white p-2 rounded-lg'>Jarak Poros Roda / Wheelbase <span>{item?.wheelBase ? Number(item?.wheelBase).toFixed(2) : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-slate-500 text-white p-2 rounded-lg'>Jarak Pijak / Tread (Depan/Front) <span>{item?.frontThread ? Number(item?.frontThread).toFixed(2) : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-red-500 text-white p-2 rounded-lg'>Jarak Pijak / Tread (Belakang / Rear) <span>{item?.rearThread ? Number(item?.rearThread).toFixed(2) : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-slate-500 text-white p-2 rounded-lg'>Jarak Terendah / Ground Clearance <span>{item?.groundClearance ? Number(item?.groundClearance).toFixed(2) : 'Tidak ada data'}</span></li>
                                                </ul>
                                            )) :
                                            (
                                                <div className='flex items-center justify-center font-bold'>Tidak ada data</div>
                                            )
                                    }
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className='text-xl'>MESIN</AccordionTrigger>
                                <AccordionContent
                                    className='flex flex-col gap-2'
                                >
                                    {
                                        data?.model_machine?.length ?
                                            data?.model_machine?.map((item, index) => (
                                                <ul className='flex flex-col text-md uppercase space-y-1'>
                                                    <li className='flex items-center justify-between bg-slate-500 text-white p-2 rounded-lg'>Tipe Mesin / Engine Type <span>{item?.engineType ? item?.engineType : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-red-500 text-white p-2 rounded-lg'>Isi Silinder / Displacement (Cc) <span>{item?.cylinder ? Number(item?.cylinder).toFixed(2) : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-slate-500 text-white p-2 rounded-lg'>Daya Maksimum / Maximum Output (Ps/Rpm) <span>{item?.maxOutput ? Number(item?.maxOutput).toFixed(2) : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-red-500 text-white p-2 rounded-lg'>Torsi Maksimum / Maximum Torque (Kgm/Rpm) <span>{item?.maxTorq ? Number(item?.maxTorq).toFixed(2) : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-slate-500 text-white p-2 rounded-lg'>Sistem Pemasukan Bahan Bakar / Fuel System <span>{item?.fuel?.name ? item?.fuel?.name : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-red-500 text-white p-2 rounded-lg'>Kapasitas Tangki / Fuel Capacity (Liter) <span>{item?.fuelCapacity ? Number(item?.fuelCapacity).toFixed(2) : 'Tidak ada data'}</span></li>
                                                </ul>
                                            )) :
                                            (
                                                <div className='flex items-center justify-center font-bold'>Tidak ada data</div>
                                            )
                                    }
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className='text-xl'>SASIS</AccordionTrigger>
                                <AccordionContent
                                    className='flex flex-col gap-2'
                                >
                                    {
                                        data?.model_chasis?.length ?
                                            data?.model_chasis?.map((item, index) => (
                                                <ul className='flex flex-col text-md uppercase space-y-1'>
                                                    <li className='flex items-center justify-between bg-slate-500 text-white p-2 rounded-lg'>Transmisi / Transmission Type <span>{item?.transmitionType ? item?.transmitionType : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-red-500 text-white p-2 rounded-lg'>Suspensi Depan / Front Suspension <span>{item?.frontSuspension ? item?.frontSuspension : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-slate-500 text-white p-2 rounded-lg'>Suspensi Belakang / Rear Suspension <span>{item?.rearSuspension ? item?.rearSuspension : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-red-500 text-white p-2 rounded-lg'>Rem Depan / Front Brake <span>{item?.frontBrake ? item?.frontBrake : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-slate-500 text-white p-2 rounded-lg'>Rem Belakang / Rear Brake <span>{item?.rearBrake ? item?.rearBrake : 'Tidak ada data'}</span></li>
                                                    <li className='flex items-center justify-between bg-red-500 text-white p-2 rounded-lg'>Ukuran Ban / Tires Size <span>{item?.tireSize ? item?.tireSize : 'Tidak ada data'}</span></li>
                                                </ul>
                                            )) :
                                            (
                                                <div className='flex items-center justify-center font-bold'>Tidak ada data</div>
                                            )
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
