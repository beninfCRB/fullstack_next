import { CarouselComponent } from "@/components/public/carousel";
import { CarouselProductComponent } from "@/components/public/carousel-product";
import { GetCarouselImage } from "@/data/carousel-image";
import { GetProduct } from "@/data/product";


export default async function Home() {
  const carousel = await GetCarouselImage() || []
  const product = await GetProduct() || []

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
    </div>
  )
}
