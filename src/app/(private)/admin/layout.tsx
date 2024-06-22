import Sidebar from '@/components/admin/ui/sidebar'
import React, { Suspense } from 'react'
import LoadingPrivatePage from './loading'
import { HeadNavBar } from '@/components/admin/ui/head-navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <Suspense fallback={<LoadingPrivatePage />}>
            <section className='flex mx-auto w-full'>
                {/* sidebar */}
                <div className="hidden lg:block md:block">
                    <Sidebar />
                </div>
                {/* main page */}
                <div className="p-4 lg:p-8 xl:p-8 2xl:p-8 w-full lg:pl-[width-of-SideNavbar]">
                    <HeadNavBar
                        title={process.env.APP_NAME as string}
                    />
                    {children}
                </div>
            </section>
        </Suspense>
    )
}