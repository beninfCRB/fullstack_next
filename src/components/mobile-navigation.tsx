"use client"

import LogoIcon from './logo-icon'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { AlignJustify } from 'lucide-react'

export default function MobileNavigation({ children }: { children: React.ReactNode }) {
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
                        {children}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}