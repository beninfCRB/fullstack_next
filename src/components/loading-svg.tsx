import Image from "next/image";
import logo from "../../public/image/logo-svg.svg"
import React from 'react'

const sOnly = (
    <Image src={logo}
        width={45}
        height={20}
        alt=''
    />
)

export default function LoadingSVG() {
    return (
        <div className="loadingLogoLay">
            <div className="sOnlyCont">{sOnly}</div>
        </div>
    )
}
