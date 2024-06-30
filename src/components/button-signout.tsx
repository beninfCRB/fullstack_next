import { ExitIcon } from '@radix-ui/react-icons'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'

export default function ButtonSignout() {
    const { data: session } = useSession()
    const onClick = () => {
        signOut()
    }

    return (
        <div>
            <Button
                className='rounded-full'
                onClick={onClick}
                type="submit"
            >
                <ExitIcon
                    className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all hover:rotate-90 hover:scale-110'
                />
            </Button>
        </div>
    )
}

