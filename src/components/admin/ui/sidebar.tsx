"use client";

import { useState, useEffect } from "react";
import { NavSideBar } from "./nav-sidebar";

import {
    ChevronRight,
    LayoutDashboard,
    Settings,
    ShoppingCart,
    UsersRound
} from "lucide-react";
import { Button } from "../../ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import { private_links } from "@/app/(private)/admin/router";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onlyWidth = useWindowWidth();
    const mobileWidth = onlyWidth < 768;

    function toggleSidebar() {
        setIsCollapsed(!isCollapsed);
    }

    // Pastikan bahwa komponen hanya di-render di client-side
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }


    return (
        <aside className="relative min-w-[80px] border-r h-svh px-3 pb-10 pt-24">
            {!mobileWidth && (
                <div className="absolute right-[-20px] top-7">
                    <Button
                        onClick={toggleSidebar}
                        variant="secondary"
                        className="rounded-full p-2"
                        asChild={false}
                    >
                        <ChevronRight />
                    </Button>
                </div>
            )}
            <NavSideBar
                isCollapsed={mobileWidth ? true : isCollapsed}
                links={private_links}
            />
        </aside>
    );
}