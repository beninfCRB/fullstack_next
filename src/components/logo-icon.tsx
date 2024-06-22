
import Image from 'next/image'
import Link from 'next/link'
import logo from "../../public/image/logo.png"

interface LogoProps {
    title?: string
    href: string
    className?: string
}

const LogoIcon = (props: LogoProps) => {
    return (
        <Link href={props.href}>
            <Image
                className={props.className}
                src={logo}
                width={45}
                height={20}
                alt=''
            />
            <p className='text-center font-semibold'>
                {props.title}
            </p>
        </Link>
    )
}

export default LogoIcon