"use client"

import PageTitle from "@/components/admin/page-title";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
    const { data: session } = useSession()

    return (
        <div className="flex flex-col gap-5 w-full">
            <PageTitle title="Settings" />
            {
                session?.user.email
            }
        </div>
    );
}