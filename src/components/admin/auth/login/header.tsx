import { cn } from '@/lib/utils'
import { LockClosedIcon } from '@radix-ui/react-icons'
import { Poppins } from 'next/font/google'

const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
})

interface HeaderProps {
    label: string
}

export default function Header({
    label
}: HeaderProps) {
    return (
        <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
            <h1 className={cn(
                "text-3xl font-semibold",
                font.className
            )}>
                Masuk
            </h1>
            <p className='text-muted-foreground text-sm'>
                {label}
            </p>
        </div>
    )
} 