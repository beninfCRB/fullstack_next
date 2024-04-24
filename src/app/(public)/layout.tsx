import Footer from '@/components/footer'
import Header from '@/components/header'
import React from 'react'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <Header />
            {children}
            <Footer />
        </section>
    )
}
