import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'
import BackButton from './back-button'
import Header from './header'

export default function ErrorCard() {
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header headLabel='ERROR' descLabel='Oops ! Something went wrong' />
            </CardHeader>
            <CardFooter>
                <BackButton
                    href='/auth/login'
                    label='Back to login'
                />
            </CardFooter>
        </Card>
    )
}
