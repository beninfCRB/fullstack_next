import HeadNavBar from '@/components/admin/head-navbar'
import SideNavbar from '@/components/admin/side-navbar'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className='flex min-h-screen w-full'>
            {/* sidebar */}
            <SideNavbar />
            {/* main page */}
            <div className="p-8 w-full">
                <HeadNavBar />
                {children}
            </div>
        </section>
    )
}