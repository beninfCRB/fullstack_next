import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface BackButtonProps {
    href: string
    label: string
}

export default function BackButton({ href, label }: BackButtonProps) {
    return (
        <Button>
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}
