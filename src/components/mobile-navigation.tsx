"use client"

import Nav from './navigation'
import LogoIcon from './logo-icon'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { AlignJustify } from 'lucide-react'

export default function MobileNavigation() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <AlignJustify
                    className='cursor-pointer'
                />
            </SheetTrigger>
            <SheetContent>
                <div className='flex flex-col items-center justify-between h-full py-8'>
                    <div className='flex flex-col items-center gap-y-32'>
                        <LogoIcon href='/' />
                        <Nav
                            containerStyles='flex flex-col items-center gap-y-6'
                            linkStyles='text-1xl font-semibold'
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}