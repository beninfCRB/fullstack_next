import {
    ChevronRight,
    LayoutDashboard,
    Settings,
    ShoppingCart,
    UsersRound
} from "lucide-react";

interface PrivateLinksProps {
    title: string
    href: string
    icon: any
    variant: any
}

export const private_links: Array<PrivateLinksProps> =
    [
        {
            title: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
            variant: "default"
        },
        {
            title: "Tipe",
            href: "/admin/type",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            title: "Warna",
            href: "/admin/color",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            title: "Bahan Bakar",
            href: "/admin/fuel",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            title: "Transmisi",
            href: "/admin/transmition",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            title: "Produk",
            href: "/admin/product",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            title: "Settings",
            href: "/admin/settings",
            icon: Settings,
            variant: "ghost"
        }
    ]