"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import Header from './header'
import Social from './auth/login/social'

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel?: string
    descLabel?: string
    backButtonLabel?: string
    backButtonHref?: string
    showSocial?: boolean
}

export default function CardWrapper({
    children,
    headerLabel,
    descLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) {

    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header headLabel={headerLabel} descLabel={descLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            {backButtonHref && backButtonLabel && (
                <div
                    className='flex items-center justify-center'
                >
                    <Button
                        size={'sm'}
                        variant={'link'}
                    >
                        <div className='flex items-center justify-center'>
                            <Link href={backButtonHref}>{backButtonLabel}</Link>
                        </div>
                    </Button>
                </div>
            )}
        </Card>
    )
}
