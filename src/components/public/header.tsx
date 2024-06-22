"use client"

import React, { FunctionComponent, useEffect, useState } from 'react'
import ThemeToggler from '../theme-toggler'
import Nav from '../navigation'
import Link from 'next/link'
import { PersonIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'
import LogoIcon from '../logo-icon'
import { MobileNavigation } from '../mobile-navigation'
import { public_links } from '@/app/(public)/router'

interface HeaderProps {
    title: string
}

export const Header: FunctionComponent<HeaderProps> = function ({ ...props }) {
    const [header, setHeader] = useState(false)
    const pathName = usePathname()

    useEffect(() => {
        const scrollYPos = window.addEventListener('scroll', () => {
            window.scrollY > 50 ? setHeader(true) : setHeader(false)
        })

        return () => window.removeEventListener('scroll', scrollYPos as any)
    })
    return (
        <header
            className={
                `${header ? 'py-4 bg-tertiary shadow-lg dark:bg-accent'
                    : 'py-6 dark:bg-transparent'
                } sticky top-0 z-30 transition-all ${pathName === '/' && 'bg-[#fff]'}`
            }
        >
            <div className='container mx-auto'>
                <div className='flex items-center justify-between'>
                    <LogoIcon title={props.title} href='/' />
                    <div className='flex items-center gap-x-6'>
                        <Nav
                            data={public_links}
                            containerStyles='hidden xl:flex gap-x-8 items-center'
                            linkStyles='relative hover:text-primary transition-all'
                            underlineStyles='absolute left-0 top-full h-[2px] bg-primary w-full'
                        />
                        <Link href={'/admin'}>
                            <PersonIcon />
                        </Link>
                        <ThemeToggler />

                        <div className='xl:hidden'>
                            <MobileNavigation
                                title={props.title}
                            >
                                <Nav
                                    data={public_links}
                                    containerStyles='flex flex-col items-center gap-y-6'
                                    linkStyles='text-1xl font-semibold'
                                />
                            </MobileNavigation>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header