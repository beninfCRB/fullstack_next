export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className='flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-400 to-red-800'>
            <div className="space-y-6">
                {children}
            </div>
        </section>
    )
}