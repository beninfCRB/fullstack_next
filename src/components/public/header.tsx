"use client"

import React, { useEffect, useState } from 'react'
import ThemeToggler from '../theme-toggler'
import Nav from '../navigation'
import Link from 'next/link'
import { PersonIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'
import LogoIcon from '../logo-icon'
import MobileNavigation from '@/components/mobile-navigation'

const Header = () => {
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
                    <LogoIcon title='DIAN REJEKI TOYOTA' href='/' />
                    <div className='flex items-center gap-x-6'>
                        <Nav
                            containerStyles='hidden xl:flex gap-x-8 items-center'
                            linkStyles='relative hover:text-primary transition-all'
                            underlineStyles='absolute left-0 top-full h-[2px] bg-primary w-full'
                        />
                        <Link href={'/admin'}>
                            <PersonIcon />
                        </Link>
                        <ThemeToggler />

                        <div className='xl:hidden'>
                            <MobileNavigation>
                                <Nav
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