"use client"

import { PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggler from '../theme-toggler'
import MobileNavigation from '../mobile-navigation'
import Nav from './navigation'
import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import ButtonSignout from '../button-signout'

export default function HeadNavBar() {
    const [header, setHeader] = useState(false)
    const pathName = usePathname()

    return (
        <div>
            <header
                className={
                    `${header ? 'py-4 bg-tertiary shadow-lg dark:bg-accent'
                        : 'py-6 dark:bg-transparent'
                    } top-0 z-30 transition-all ${pathName === '/admin' && 'bg-[#fff]'}`
                }
            >
                <div className='flex flex-col gap-y-4 mr-auto'>
                    <div className='flex items-center gap-x-6'>
                        <div className='block md:hidden xs:hidden'>
                            <MobileNavigation>
                                <Nav
                                    containerStyles='flex flex-col items-center gap-y-6'
                                    linkStyles='text-1xl font-semibold'
                                />
                            </MobileNavigation>
                        </div>
                        <ButtonSignout />
                        <ThemeToggler />
                    </div>
                </div>
            </header>
        </div>
    )
}
