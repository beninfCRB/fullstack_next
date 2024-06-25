
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
        <Link
            href={props.href}
            className='flex flex-col lg:flex-row items-center justify-center gap-2'
        >
            <Image
                className={`basis-1/2 size-auto ${props.className}`}
                src={logo}
                width={30}
                height={30}
                alt=''
            />
            <p className='basis-1/2 text-center font-bold italic decoration-red-500 text-wrap lg:text-nowrap text-xs lg:text-2xl'>
                {props.title}
            </p>
        </Link>
    )
}

export default LogoIcon