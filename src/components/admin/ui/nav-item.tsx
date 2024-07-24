"use client";

import { ChevronDownIcon, LucideIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { motion } from 'framer-motion';
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordian-custom";

export interface linksProps {
    name: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    path: string;
    child?: linksProps[]
}

interface NavItemProps {
    index: number
    link: linksProps
    isCollapsed?: boolean
    path: string
    containerStyles?: string,
    linkStyles?: string,
    underlineStyles?: string,
}

const NavItem: FunctionComponent<NavItemProps> = ({ index, link, isCollapsed, path, linkStyles }) => {
    return (
        isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                    <Link
                        href={link.path}
                        className={cn(
                            buttonVariants({
                                variant: link.path === path ? "default" : "ghost",
                                size: "icon"
                            }),
                            "h-9 w-9",
                            link.variant === "default" &&
                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                        )}
                    >
                        <link.icon className="h-4 w-4" />
                        <span className="sr-only">{link.name}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                >
                    {link.name && (
                        <span className="ml-auto text-muted-foreground">
                            {link.name}
                        </span>
                    )}
                </TooltipContent>
            </Tooltip>
        ) : (
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={link?.name} className="w-full">
                    <AccordionTrigger
                        className={`uppercase ${linkStyles}`}
                    >
                        <Link
                            href={link.path}
                            key={index}
                            className={cn(
                                buttonVariants({
                                    variant: link.path === path ? "default" : "ghost",
                                    size: "sm"
                                }),
                                "flex flex-row w-full gap-1",
                                link.variant === "default" &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                "justify-start"
                            )}
                        >
                            <link.icon className="h-4 w-4" />
                            {link.name.toUpperCase()}
                        </Link>
                    </AccordionTrigger>
                </AccordionItem>
            </Accordion>
        )
    )
}

const NavItemChild: FunctionComponent<NavItemProps> = ({ index, link, path, isCollapsed, linkStyles, containerStyles, underlineStyles }) => {
    return (
        <div
            key={index}
            className='w-full'
        >
            {isCollapsed ?
                <Tooltip key={index} delayDuration={0}>
                    <TooltipTrigger asChild>
                        <div
                            className={cn(
                                buttonVariants({
                                    variant: link.path === path ? "default" : "ghost",
                                    size: "icon"
                                }),
                                "w-full h-full",
                                link.variant === "default" &&
                                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                            )}
                        >
                            <link.icon className="h-4 w-4" />
                            <span className="sr-only">{link.name}</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent
                        side="right"
                        className="flex items-center justify-between p-2"
                    >
                        {
                            link?.child?.map((link_child, ic) =>
                                <Link
                                    key={index}
                                    href={link_child.path}
                                    className={cn(
                                        buttonVariants({
                                            variant: link_child.path === path ? "default" : "ghost",
                                            size: "icon"
                                        }),
                                        "flex flex-row w-full gap-1 px-8",
                                        link_child.variant === "default" &&
                                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                    )}
                                >
                                    <link_child.icon className="h-4 w-4" />
                                    {link_child.name.toUpperCase()}
                                </Link>
                            )
                        }
                    </TooltipContent>
                </Tooltip>
                :
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={link?.name} className="w-full">
                        <AccordionTrigger
                            className={cn(
                                buttonVariants({
                                    variant: link.path === path ? "default" : "ghost",
                                    size: "sm"
                                }),
                                "flex flex-row w-full gap-1",
                                link.variant === "default" &&
                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                "justify-stretch my-2"
                            )}
                        >
                            <link.icon className="h-4 w-4" />
                            {link.name.toUpperCase()}
                            <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 flex items-center ml-auto" />
                        </AccordionTrigger>
                        <AccordionContent
                            className='border rounded-lg w-full space-y-2 p-2 bg-slate-500 text-white'
                        >
                            {
                                link?.child?.map((detail, id) => {
                                    const adjustedPathDetail = path.startsWith('/product') ? `/${detail.path}` : detail.path;
                                    return (
                                        <Link
                                            href={adjustedPathDetail}
                                            key={id}
                                            className={cn(
                                                buttonVariants({
                                                    variant: detail.path === path ? "default" : "ghost",
                                                    size: "sm"
                                                }),
                                                "flex flex-row w-full gap-1",
                                                detail.variant === "default" &&
                                                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                                "justify-start"
                                            )}
                                        >
                                            {detail?.path === path && (
                                                <motion.span
                                                    initial={{ y: '-100%' }}
                                                    animate={{ y: 0 }}
                                                    transition={{ type: 'tween' }}
                                                    layoutId='underline'
                                                    className={`${underlineStyles}`}
                                                />
                                            )}
                                            <detail.icon className="h-4 w-4" />
                                            {detail.name.toUpperCase()}
                                        </Link>
                                    )
                                }
                                )
                            }
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            }
        </div>
    )
}

export { NavItem, NavItemChild }