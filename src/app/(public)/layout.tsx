import Footer from '@/components/public/footer'
import Header from '@/components/public/header'
import React, { Suspense } from 'react'
import LoadinPublicPage from './loading'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<LoadinPublicPage />}>
            <section
                className='flex flex-col w-full'
            >
                <Header title={process.env.APP_NAME as string} />
                {children}
                <Footer />
            </section>
        </Suspense>
    )
}
