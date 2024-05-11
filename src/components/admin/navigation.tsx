"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { private_links } from '@/app/(private)/admin/router'

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
                private_links.map((link, index) => {
                    return (
                        <Link
                            href={link.href}
                            key={index}
                            className={`uppercase ${linkStyles}`}
                        >
                            {link.href === path && (
                                <motion.span
                                    initial={{ y: '-100%' }}
                                    animate={{ y: 0 }}
                                    transition={{ type: 'tween' }}
                                    layoutId='underline'
                                    className={`${underlineStyles}`}
                                />
                            )}
                            {link.title}
                        </Link>
                    )
                })
            }
        </nav>
    )
}

export default Nav