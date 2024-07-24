"use client"

import { public_links } from '@/app/(public)/router'
import { MapPinIcon, PhoneCallIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FunctionComponent } from 'react'

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = ({ ...props }) => {
    const path = usePathname()

    const fixed = 'xl:fixed lg:relative md:relative'

    return (
        <div
            className={`flex flex-col lg:flex-row bg-red-500 items-stretch justify-center relative bottom-0 mt-auto h-max text-white p-8 gap-12`}
        >
            <div
                className='basis-2/5'
            >
                <h1 className='font-bold text-2xl italic underline text-white decoration-gray-500 mb-8'>TENTANG:</h1>
                <p className='text-justify'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, ut accusamus? Ratione similique dolorum repellendus nam provident iure, animi ab delectus illum, a suscipit inventore dignissimos eum vitae excepturi optio.
                </p>
            </div >
            <div
                className='basis-1/5'
            >
                <h1 className='font-bold text-2xl italic underline text-white decoration-gray-500 mb-8'>NAVIGASI:</h1>
                <div
                    className='flex flex-col'
                >
                    {
                        public_links.map((item, i) =>
                            <Link
                                key={i}
                                href={item.path}
                            >
                                <h1 className='font-bold text-xl text-white'>{item.name.toUpperCase()}</h1>
                            </Link>
                        )
                    }
                </div>
            </div>
            <div
                className='basis-1/5'
            >
                <h1 className='font-bold text-2xl italic underline text-white decoration-gray-500 mb-8'>JAM KERJA:</h1>
                <div></div>
            </div>
            <div
                className='basis-1/5'
            >
                <h1 className='font-bold text-2xl italic underline text-white decoration-gray-500 mb-8'>ALAMAT:</h1>
                <div
                    className='flex flex-col'
                >
                    <div>
                        <h1 className='flex flex-row'><MapPinIcon />  &nbsp; REJEKI TOYOTA SUMEDANG</h1>
                        <p className='text-justify'>
                            Jl. Mayor Abdurahman No.130, Kotakaler, Kec. Sumedang Utara, Kabupaten Sumedang, Jawa Barat 45322
                        </p>
                        <span className='flex flex-row'><PhoneCallIcon />  &nbsp; (0261) 209 500</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Footer