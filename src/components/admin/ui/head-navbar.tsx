"use client"

import { usePathname } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import ButtonSignout from '../../button-signout'
import ThemeToggler from '../../theme-toggler'
import { MobileNavigation } from '@/components/mobile-navigation'
import Nav from '@/components/navigation'
import { private_links } from '@/app/(private)/admin/router'

interface HeadNavBarProps {
    title: string
}

export const HeadNavBar: FunctionComponent<HeadNavBarProps> = function ({ ...props }) {
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
                            <MobileNavigation
                                title={props.title}
                            >
                                <Nav
                                    data={private_links}
                                    containerStyles='flex flex-col items-center gap-y-4'
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
