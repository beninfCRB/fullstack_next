"use server"

import { DataTable } from "@/components/admin/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/admin/page-title";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

type Props = {};

interface Setting {
    category: string;
    value: string | number | boolean;
}

const columns: ColumnDef<Setting>[] = [
    {
        accessorKey: "category",
        header: "Category"
    },
    {
        accessorKey: "value",
        header: "Value"
    }
];
const data: Setting[] = [
    {
        category: "Account",
        value: true
    },
    {
        category: "Notifications",
        value: false
    },
    {
        category: "Language",
        value: "English"
    },
    {
        category: "Theme",
        value: "Dark"
    }
];

export default async function SettingsPage({ }: Props) {
    const session = await auth()
    const user = session?.user

    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="Settings" />
            {
                user?.email
            }
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <Button type="submit">
                    Sign Out
                </Button>
            </form>
        </div>
    );
}