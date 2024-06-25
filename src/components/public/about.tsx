"use client"

import React, { FunctionComponent } from 'react'
import { motion } from 'framer-motion'
import { aboutVariants, titleVariants } from '@/utils/animate'
import Image from 'next/image'
import aboutImage from '../../../public/image/logo.png'

interface AboutProps {

}

export const AboutComponent: FunctionComponent<AboutProps> = function ({ ...props }) {
    return (
        <section id="about" className='flex flex-col items-start justify-center p-4 lg:p-32 bg-slate-400'>
            <motion.h1
                initial="offscreen"
                whileInView={"onscreen"}
                variants={titleVariants}
                className="text-2xl font-bold mb-8"
            >
                TENTANG KAMI
            </motion.h1>
            <motion.div
                initial="offscreen"
                whileInView={"onscreen"}
                variants={aboutVariants}
                className="flex flex-row gap-8 w-full"
            >
                <Image
                    src={aboutImage}
                    width={300}
                    height={300}
                    alt=''
                    className='basis-1/4 size-auto'
                />
                <motion.span
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={titleVariants}
                    className='basis-3/4 text-justify text-wrap'
                >
                    REJEKI TOYOTA merupakan salah satu Authorized TOYOTA Dealer di Jawa Barat yaitu Rejeki Toyota Cirebon, Rejeki Toyota Sumedang, Rejeki Toyota Indramayu .
                </motion.span>
            </motion.div>
        </section>
    )
}
