"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { public_links } from '@/app/(public)/router'

interface Props {
    containerStyles?: string,
    linkStyles?: string,
    underlineStyles?: string
}

const Nav = ({ containerStyles, linkStyles, underlineStyles }: Props) => {
    const path = usePathname()
    return (
        <nav className={`${containerStyles}`}>
            {
                public_links.map((link, index) => {
                    return (
                        <Link
                            href={link.path}
                            key={index}
                            className={`uppercase ${linkStyles}`}
                        >
                            {link.path === path && (
                                <motion.span
                                    initial={{ y: '-100%' }}
                                    animate={{ y: 0 }}
                                    transition={{ type: 'tween' }}
                                    layoutId='underline'
                                    className={`${underlineStyles}`}
                                />
                            )}
                            {link.name}
                        </Link>
                    )
                })
            }
        </nav>
    )
}

export default Nav