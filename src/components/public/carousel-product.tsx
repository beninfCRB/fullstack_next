"use client"

import { motion } from 'framer-motion';
import { BadgeDollarSignIcon, CalendarDaysIcon, FuelIcon, GaugeIcon } from "lucide-react";
import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";
import { ProductType } from "../admin/product/product-main/type";
import { ButtonMain } from "../custom-button";
import { Carousel, CarouselMainContainer, CarouselThumbsContainer, SliderMainItem, SliderThumbItem } from "../ui/carousel-extension";
import { formattedPrice } from '@/utils/format-price';
import { produkVariants, titleVariants } from '@/utils/animate';
import { SkeletonCard } from '../skeleton-card';
import Link from 'next/link';

interface CarouselProductProps {
    data: Array<ProductType> | []
}

export const CarouselProductComponent: FunctionComponent<CarouselProductProps> = function ({ ...props }) {
    const [skeleton, setSkeleton] = useState<boolean>(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSkeleton(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [])


    return (
        props.data.length > 0 ? (
            <section id="product" className='flex flex-col items-center justify-start'>
                <motion.h1
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={titleVariants}
                    className="text-2xl font-bold mt-8"
                >
                    REKOMENDASI MOBIL
                </motion.h1>
                <motion.div
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={produkVariants}
                    className="w-full"
                >
                    <Carousel orientation="vertical" className="flex flex-col items-center justify-center gap-2 px-10 py-8 ">
                        <div
                            className="block text-center"
                        >
                            <span className="text-lg italic font-bold decoration-red-500 mb-8">Pilih Produk</span>
                            <CarouselThumbsContainer className="h-60 basis-1/4 flex flex-row flex-wrap">
                                {props.data?.map((item, index) => (
                                    <SliderThumbItem
                                        key={index}
                                        index={index}
                                        className="rounded-md flex-1"
                                    >
                                        <span className="border border-muted flex items-center justify-center h-full w-full rounded-md cursor-pointer shadow-2xl shadow-red-500">
                                            <div
                                                className="flex flex-col items-center justify-center p-2"
                                            >
                                                <Image
                                                    className='size-auto object-cover'
                                                    src={item?.product_color?.at(0)?.product_image?.at(0)?.path as string}
                                                    about={`${item.name}`}
                                                    alt=''
                                                    width={50}
                                                    height={50}
                                                    priority={false}
                                                />
                                                <h1 className="font-bold text-xs ml-2">{item?.name}</h1>
                                            </div>
                                        </span>
                                    </SliderThumbItem>
                                ))}
                            </CarouselThumbsContainer>
                        </div>
                        <div className="relative basis-3/4 h-[25rem] lg:size-auto">
                            <CarouselMainContainer className="h-[44rem]">
                                {props.data?.map((item, index) => (
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
                                                    src={item?.product_color?.at(0)?.product_image?.at(0)?.path as string}
                                                    about={`${item.name}`}
                                                    alt=''
                                                    width={600}
                                                    height={200}
                                                    priority={false}
                                                />
                                                <h1 className="font-bold text-4xl">{item?.name}</h1>
                                                <div
                                                    className="flex flex-col lg:flex-row gap-6"
                                                >
                                                    <div
                                                        className="basis-1/4 flex md:flex-col items-center justify-center gap-4"
                                                    >
                                                        <FuelIcon />
                                                        <span className="text-red-500 font-bold text-lg">{item?.product_model?.at(0)?.model_machine?.at(0)?.fuel?.name ? item?.product_model?.at(0)?.model_machine?.at(0)?.fuel?.name : 'Tidak Ada Data'}</span>
                                                    </div>
                                                    <div
                                                        className="basis-1/4 flex md:flex-col items-center justify-center gap-4"
                                                    >
                                                        <GaugeIcon />
                                                        <span className="text-red-500 font-bold text-lg">{item?.product_model?.at(0)?.transmition?.name ? item?.product_model?.at(0)?.transmition?.name : 'Tidak Ada Data'}</span>
                                                    </div>
                                                    <div
                                                        className="basis-1/4 flex md:flex-col items-center justify-center gap-4"
                                                    >
                                                        <CalendarDaysIcon />
                                                        <span className="text-red-500 font-bold text-lg">{item?.buildUp ? item?.buildUp : 'Tidak Ada Data'}</span>
                                                    </div>
                                                    <div
                                                        className="basis-1/4 flex md:flex-col items-center justify-center gap-4"
                                                    >
                                                        <BadgeDollarSignIcon />
                                                        <div
                                                            className="flex flex-row items-center justify-center gap-1"
                                                        >
                                                            <span className="basis-1/2 text-nowrap">Mulai dari</span>
                                                            <span className="basis-1/2 text-red-500 font-bold text-lg">{formattedPrice(item?.product_model?.at(0)?.price?.price ? item?.product_model?.at(0)?.price?.price : 0)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="flex items-center justify-center gap-4"
                                                >
                                                    <ButtonMain
                                                        size={"lg"}
                                                        type="submit"
                                                        className="rounded-full"
                                                    >
                                                        <Link
                                                            href={'product'}
                                                        >
                                                            SELENGKAPNYA
                                                        </Link>
                                                    </ButtonMain>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </SliderMainItem>
                                ))}
                            </CarouselMainContainer>
                        </div>
                    </Carousel>
                </motion.div>
            </section>
        )
            : skeleton ? <SkeletonCard /> : null)
}
