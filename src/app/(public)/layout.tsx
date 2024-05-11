import Footer from '@/components/footer'
import Header from '@/components/header'
import React, { Suspense } from 'react'
import LoadinPublicPage from './loading'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<LoadinPublicPage />}>
            <section>
                <Header />
                {children}
                <Footer />
            </section>
        </Suspense>
    )
}
