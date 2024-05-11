import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'

const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
})

interface HeaderProps {
    headLabel?: string
    descLabel?: string
}

export default function Header({
    headLabel,
    descLabel
}: HeaderProps) {
    return (
        <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
            <h1 className={cn(
                "text-3xl font-semibold",
                font.className
            )}>
                {headLabel}
            </h1>
            <p className='text-muted-foreground text-sm'>
                {descLabel}
            </p>
        </div>
    )
} 