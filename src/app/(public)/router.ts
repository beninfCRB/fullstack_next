interface PublicLinksProps {
    path: string
    name: string
}

export const public_links: Array<PublicLinksProps> = [
    { path: '/', name: 'home' },
    { path: '/product', name: 'product' },
    { path: '/promo', name: 'promo' },
    { path: '/about', name: 'about' },
    { path: '/contact', name: 'contact' },
]