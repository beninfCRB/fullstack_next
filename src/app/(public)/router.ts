import { Building, Car, Compass, ListChecks, Ticket } from "lucide-react"

interface PublicLinksProps {
    path: string
    name: string
    icon: any
}

export const public_links: Array<PublicLinksProps> = [
    { path: '#banner', name: 'home', icon: Compass },
    { path: '#product', name: 'produk', icon: Car },
    { path: '#promo', name: 'promo', icon: Ticket },
    { path: '#about', name: 'tentang kami', icon: Building },
    { path: 'product', name: 'semua produk', icon: ListChecks },
    // { path: '#contact', name: 'kontak' },
]