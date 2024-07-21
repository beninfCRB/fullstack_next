"use client";


import { TooltipProvider } from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";
import { NavItem, NavItemChild, linksProps } from "./nav-item";

interface NavProps {
    isCollapsed: boolean;
    links: linksProps[];
}

export function NavSideBar({ links, isCollapsed }: NavProps) {
    const path = usePathname();
    return (
        <TooltipProvider>
            <div
                data-collapsed={isCollapsed}
                className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
            >
                <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                    {
                        links.map((head, ih) => {
                            const adjustedPath = path.startsWith('/product') ? `/${head.path}` : head.path;
                            return head?.child ? (
                                <NavItemChild
                                    index={ih}
                                    link={head}
                                    isCollapsed={isCollapsed}
                                    path={path}
                                    linkStyles="flex flex-row items-center justify-start gap-2"
                                />
                            ) :
                                (
                                    <NavItem
                                        index={ih}
                                        link={head}
                                        isCollapsed={isCollapsed}
                                        path={path}
                                        linkStyles="flex flex-row items-center justify-start gap-2"
                                    />
                                )
                        })
                    }
                </nav>
            </div>
        </TooltipProvider >
    );
}
