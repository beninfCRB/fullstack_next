"use client"

import Autoplay from "embla-carousel-autoplay";
import { motion } from 'framer-motion';
import Image from "next/image";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { CarouselImageType } from "../admin/carousel-image/type";
import { Carousel, CarouselIndicator, CarouselMainContainer, CarouselThumbsContainer, SliderMainItem } from "../ui/carousel-extension";
import { bannerVariants } from "@/utils/animate";
import { SkeletonCard } from "../skeleton-card";

interface CarouselProps {
    data: Array<CarouselImageType> | []
}

export const CarouselComponent: FunctionComponent<CarouselProps> = function ({ ...props }) {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const [skeleton, setSkeleton] = useState<boolean>(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSkeleton(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [])

    return (
        props.data.length > 0 ? (
            <motion.div
                initial="offscreen"
                whileInView={"onscreen"}
                variants={bannerVariants}
                className="w-full"
            >
                <section id="banner">
                    <Carousel
                        plugins={[
                            plugin.current
                        ]}
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                        carouselOptions={{
                            loop: true,
                        }}
                    >
                        <div className="relative">
                            <CarouselMainContainer className="w-full aspect-video max-h-[40rem]">
                                {
                                    props.data?.map((item, index) =>
                                    (
                                        <SliderMainItem key={index} className="bg-transparent">
                                            <div className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background">
                                                <Image
                                                    className='object-fill aspect-video lg:size-full'
                                                    src={item?.path as string}
                                                    about={`${item.name}`}
                                                    alt=''
                                                    width={1500}
                                                    height={500}
                                                    priority={false}
                                                />
                                            </div>
                                        </SliderMainItem>
                                    )
                                    )
                                }
                            </CarouselMainContainer>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                                <CarouselThumbsContainer className="gap-x-1 ">
                                    {props.data?.map((_, index) => (
                                        <CarouselIndicator key={index} index={index} />
                                    ))}
                                </CarouselThumbsContainer>
                            </div>
                        </div>
                    </Carousel>
                </section>
            </motion.div>
        ) : skeleton ? <SkeletonCard /> : null)
}
