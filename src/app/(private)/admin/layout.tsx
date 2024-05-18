
import HeadNavBar from '@/components/admin/ui/head-navbar'
import Sidebar from '@/components/admin/ui/sidebar'
import React, { Suspense } from 'react'
import LoadingPrivatePage from './loading'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<LoadingPrivatePage />}>
            <section className='flex min-h-screen w-full'>
                {/* sidebar */}
                <div className="hidden lg:block md:block">
                    <Sidebar />
                </div>
                {/* main page */}
                <div className="p-4 lg:p-8 xl:p-8 2xl:p-8 w-full lg:pl-[width-of-SideNavbar]">
                    <HeadNavBar />
                    {children}
                </div>
            </section>
        </Suspense>
    )
}