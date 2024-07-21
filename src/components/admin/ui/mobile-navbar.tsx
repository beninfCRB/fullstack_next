"use client"

import { usePathname } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import ButtonSignout from '../../button-signout'
import ThemeToggler from '../../theme-toggler'
import { MobileNavigation } from '@/components/mobile-navigation'
import Nav from '@/components/navigation'
import { private_links } from '@/app/(private)/admin/router'
import { NavItem, NavItemChild } from './nav-item'

interface HeadNavBarProps {
    title: string
}

export const MobileNavBar: FunctionComponent<HeadNavBarProps> = function ({ ...props }) {
    const [header, setHeader] = useState(false)
    const path = usePathname()

    return (
        <div>
            <header
                className={
                    `${header ? 'py-4 bg-tertiary shadow-lg dark:bg-accent'
                        : 'py-6 dark:bg-transparent'
                    } top-0 z-30 transition-all ${path === '/admin' && 'bg-[#fff]'}`
                }
            >
                <div className='flex flex-col gap-y-4 mr-auto'>
                    <div className='flex items-center gap-x-6'>
                        <div className='block md:hidden xs:hidden'>
                            <MobileNavigation
                                title={props.title}
                            >
                                <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                                    {
                                        private_links.map((head, ih) => {
                                            const adjustedPath = path.startsWith('/product') ? `/${head.path}` : head.path;
                                            return head?.child ? (
                                                <div key={ih}>
                                                    <NavItemChild
                                                        index={ih}
                                                        link={head}
                                                        path={path}
                                                        linkStyles="flex flex-row items-center justify-start gap-2"
                                                    />
                                                </div>
                                            ) :
                                                (
                                                    <div key={ih}>
                                                        <NavItem
                                                            index={ih}
                                                            link={head}
                                                            path={path}
                                                            linkStyles="flex flex-row items-center justify-start gap-2"
                                                        />
                                                    </div>
                                                )
                                        })
                                    }
                                </nav>
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
