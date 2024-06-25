import Card, { CardContent, CardProps } from "@/components/admin/ui/card";
import BarChart from "@/components/admin/ui/bar-chart";
import PageTitle from "@/components/admin/ui/page-title";
import SalesCard, { SalesProps } from "@/components/admin/ui/sales-card";
import { Activity, CarIcon, CreditCard, DollarSign, Users } from "lucide-react";
import { GetProduct } from "@/data/product";
import { GetModel } from "@/data/model";
import { GetCarouselImage } from "@/data/carousel-image";
import { GetPromo } from "@/data/promo";

export default async function Home() {
    const product = await GetProduct() || []
    const model = await GetModel() || []
    const carousel = await GetCarouselImage() || []
    const promo = await GetPromo() || []


    const cardData: CardProps[] = [
        {
            label: "Model",
            amount: model.length.toString(),
            description: "Tota Model",
            icon: CarIcon
        },
        {
            label: "Produk",
            amount: product.length.toString(),
            description: "Total Produk",
            icon: CarIcon
        },
        {
            label: "Banner",
            amount: carousel.length.toString(),
            description: "Total Banner",
            icon: CarIcon
        },
        {
            label: "Promo",
            amount: promo.length.toString(),
            description: "Total Promo",
            icon: CarIcon
        },
    ];

    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="Dashboard" />
            <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
                {cardData.map((d, i) => (
                    <Card
                        key={i}
                        amount={d.amount}
                        description={d.description}
                        icon={d.icon}
                        label={d.label}
                    />
                ))}
            </section>
        </div>
    );
}