"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

interface linkType {
    path: string
    name: string
    icon: any
    variant?: any
}

interface Props {
    containerStyles?: string,
    linkStyles?: string,
    underlineStyles?: string,
    data: Array<linkType>
}

const Nav = ({ containerStyles, linkStyles, underlineStyles, data }: Props) => {
    const path = usePathname()
    const router = useRouter()

    return (
        <nav className={`${containerStyles}`}>
            {
                data.map((link, index) => {
                    const adjustedPath = path.startsWith('/product') ? `/${link.path}` : link.path;
                    return (
                        <Link
                            href={adjustedPath}
                            key={index}
                            className={`flex flex-row items-center gap-1 justify-start uppercase ${linkStyles}`}
                        >
                            {link?.path === path && (
                                <motion.span
                                    initial={{ y: '-100%' }}
                                    animate={{ y: 0 }}
                                    transition={{ type: 'tween' }}
                                    layoutId='underline'
                                    className={`${underlineStyles}`}
                                />
                            )}
                            <link.icon className="h-4 w-4" />
                            {link.name}
                        </Link>
                    )
                })
            }
        </nav>
    )
}

export default Nav