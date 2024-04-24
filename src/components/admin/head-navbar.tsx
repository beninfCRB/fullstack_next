"use client"

import { PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggler from '../theme-toggler'

export default function HeadNavBar() {
    const [header, setHeader] = useState(false)
    const pathName = usePathname()

    return (
        <header
            className={
                `${header ? 'py-4 bg-tertiary shadow-lg dark:bg-accent'
                    : 'py-6 dark:bg-transparent'
                }  top-0 z-30 transition-all ${pathName === '/admin' && 'bg-[#fff]'}`
            }
        >
            <div className='flex flex-col gap-y-4 mr-auto'>
                <div className='flex items-center gap-x-6'>
                    <Link href={'auth/login'}>
                        <PersonIcon />
                    </Link>
                    <ThemeToggler />
                </div>
            </div>
        </header>
    )
}