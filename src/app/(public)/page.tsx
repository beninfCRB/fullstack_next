import { AboutComponent } from "@/components/public/about";
import { CarouselComponent } from "@/components/public/carousel";
import { CarouselProductComponent } from "@/components/public/carousel-product";
import { PromoComponent } from "@/components/public/promo";
import { GetCarouselImage } from "@/data/carousel-image";
import { GetProduct, GetProductGroup } from "@/data/product";
import { GetPromo } from "@/data/promo";


export default async function Home() {
  const carousel = await GetCarouselImage() || []
  const product = await GetProduct() || []
  console.log('product=====>', product);

  const promo = await GetPromo() || []

  return (
    <div
      className="flex flex-col w-full items-center"
    >
      <CarouselComponent
        data={carousel}
      />
      <CarouselProductComponent
        data={product}
      />
      <PromoComponent
        data={promo}
      />
      <AboutComponent />
    </div>
  )
}
