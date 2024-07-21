import {
    BarChart4,
    BrainCircuit,
    Car,
    Cpu,
    DollarSign,
    Images,
    LayoutDashboard,
    Palette,
    PencilRuler,
    Puzzle,
    Sailboat,
    Settings,
    TicketSlash,
    TicketX
} from "lucide-react";

interface PrivateLinksProps {
    name: string
    path: string
    icon: any
    variant: any,
    child?: PrivateLinksProps[]
}

export const private_links: PrivateLinksProps[] =
    [
        {
            name: "Dashboard",
            path: "/admin",
            icon: BarChart4,
            variant: "default"
        },
        {
            name: "Master",
            path: "/admin/master",
            icon: LayoutDashboard,
            variant: "ghost",
            child: [
                {
                    name: "Model",
                    path: "/admin/master/model",
                    icon: LayoutDashboard,
                    variant: "ghost"
                },
                {
                    name: "Tipe",
                    path: "/admin/master/type",
                    icon: LayoutDashboard,
                    variant: "ghost"
                },
                {
                    name: "Warna",
                    path: "/admin/master/color",
                    icon: LayoutDashboard,
                    variant: "ghost"
                },
                {
                    name: "Bahan Bakar",
                    path: "/admin/master/fuel",
                    icon: LayoutDashboard,
                    variant: "ghost"
                },
                {
                    name: "Transmisi",
                    path: "/admin/master/transmition",
                    icon: LayoutDashboard,
                    variant: "ghost"
                },
            ]
        },
        {
            name: "Produk",
            path: "/admin/product/product-main",
            icon: Car,
            variant: "ghost",
            child: [
                {
                    name: "Produk",
                    path: "/admin/product/product-main",
                    icon: Car,
                    variant: "ghost"
                },
                {
                    name: "Warna Produk",
                    path: "/admin/product/product-color",
                    icon: Palette,
                    variant: "ghost"
                },
                {
                    name: "Gambar Produk",
                    path: "/admin/product/product-image",
                    icon: Images,
                    variant: "ghost"
                },
                {
                    name: "Model Produk",
                    path: "/admin/product/product-model",
                    icon: Puzzle,
                    variant: "ghost"
                },
            ]
        },
        {
            name: "Spesifikasi",
            path: "/admin/model/model-machine",
            icon: Cpu,
            variant: "ghost",
            child: [
                {
                    name: "Model Mesin",
                    path: "/admin/model/model-machine",
                    icon: BrainCircuit,
                    variant: "ghost"
                },
                {
                    name: "Model Rangka",
                    path: "/admin/model/model-chasis",
                    icon: Sailboat,
                    variant: "ghost"
                },
                {
                    name: "Model Dimensi",
                    path: "/admin/model/model-dimention",
                    icon: PencilRuler,
                    variant: "ghost"
                },
            ]
        },
        {
            name: "Harga",
            path: "/admin/price/price-main",
            icon: DollarSign,
            variant: "ghost"
        },
        {
            name: "Carousel",
            path: "/admin/carousel-image",
            icon: TicketX,
            variant: "ghost"
        },
        {
            name: "Promo",
            path: "/admin/promo",
            icon: TicketSlash,
            variant: "ghost"
        },
        {
            name: "Settings",
            path: "/admin/settings",
            icon: Settings,
            variant: "ghost"
        }
    ]