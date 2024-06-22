import {
    LayoutDashboard,
    Settings
} from "lucide-react";

interface PrivateLinksProps {
    name: string
    path: string
    icon: any
    variant: any
}

export const private_links: Array<PrivateLinksProps> =
    [
        {
            name: "Dashboard",
            path: "/admin",
            icon: LayoutDashboard,
            variant: "default"
        },
        {
            name: "Model",
            path: "/admin/model",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Tipe",
            path: "/admin/type",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Warna",
            path: "/admin/color",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Bahan Bakar",
            path: "/admin/fuel",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Transmisi",
            path: "/admin/transmition",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Produk",
            path: "/admin/product",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Warna Produk",
            path: "/admin/product-color",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Gambar Produk",
            path: "/admin/product-image",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Model Produk",
            path: "/admin/product-model",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Model Mesin",
            path: "/admin/model-machine",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Model Rangka",
            path: "/admin/model-chasis",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Model Dimensi",
            path: "/admin/model-dimention",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Harga",
            path: "/admin/price",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Carousel",
            path: "/admin/carousel-image",
            icon: LayoutDashboard,
            variant: "ghost"
        },
        {
            name: "Settings",
            path: "/admin/settings",
            icon: Settings,
            variant: "ghost"
        }
    ]