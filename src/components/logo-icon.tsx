import React from 'react'

import logo from "../../public/image/logo.png"
import Link from 'next/link'
import Image from 'next/image'

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
                asdasdas
            </p>
        </Link>
    )
}

export default LogoIcon