"use client"

import { FunctionComponent } from 'react'
import LogoIcon from './logo-icon'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { AlignJustify } from 'lucide-react'

interface MobileNavigationProps {
    title: string
    children: React.ReactNode
}

export const MobileNavigation: FunctionComponent<MobileNavigationProps> = function ({ title, children }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <AlignJustify
                    className='cursor-pointer'
                />
            </SheetTrigger>
            <SheetContent>
                <div className='flex flex-col items-center justify-between h-full py-8'>
                    <div className='flex flex-col items-center gap-y-8'>
                        <LogoIcon title={title} href='/' />
                        {children}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}