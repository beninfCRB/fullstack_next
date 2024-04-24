"use client";

import { useState, useEffect } from "react";
import { Nav } from "../ui/nav";

import {
    ChevronRight,
    LayoutDashboard,
    Settings,
    ShoppingCart,
    UsersRound
} from "lucide-react";
import { Button } from "../ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar() {
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
        <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
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
            <Nav
                isCollapsed={mobileWidth ? true : isCollapsed}
                links={[
                    {
                        title: "Dashboard",
                        href: "/admin",
                        icon: LayoutDashboard,
                        variant: "default"
                    },
                    {
                        title: "Users",
                        href: "/admin/users",
                        icon: UsersRound,
                        variant: "ghost"
                    },
                    {
                        title: "Orders",
                        href: "/admin/orders",
                        icon: ShoppingCart,
                        variant: "ghost"
                    },
                    {
                        title: "Settings",
                        href: "/admin/settings",
                        icon: Settings,
                        variant: "ghost"
                    }
                ]}
            />
        </div>
    );
}