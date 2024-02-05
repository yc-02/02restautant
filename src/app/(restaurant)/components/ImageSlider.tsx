"use client"
import Image from "next/image"
import {useRef} from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


import food1 from "@/FoodImages/pexels-ash-376464.jpg"
import food2 from "@/FoodImages/pexels-burst-544961.jpg"
import food3 from "@/FoodImages/pexels-lina-kivaka-1459338.jpg"
import food4 from "@/FoodImages/pexels-malidate-van-769289.jpg"
import food5 from "@/FoodImages/pexels-lisa-fotios-1279330.jpg"
import food6 from "@/FoodImages/pexels-olena-bohovyk-3323682.jpg"


export function ImageSlider() {
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
      )
  return (
    <div>
    <Carousel
          plugins={[
            Autoplay()
          ]}
    onMouseEnter={plugin.current.stop}
    onMouseLeave={plugin.current.reset}>
  <CarouselContent>
    <CarouselItem><Image src={food1} alt="image" className="h-52 md:h-60 object-cover"/></CarouselItem>
    <CarouselItem><Image src={food2} alt="image" className="h-52 md:h-60 object-cover"/></CarouselItem>
    <CarouselItem><Image src={food3} alt="image" className="h-52 md:h-60 object-cover"/></CarouselItem>
    <CarouselItem><Image src={food4} alt="image" className="h-52 md:h-60 object-cover"/></CarouselItem>
    <CarouselItem><Image src={food5} alt="image" className="h-52 md:h-60 object-cover"/></CarouselItem>
    <CarouselItem><Image src={food6} alt="image" className="h-52 md:h-60 object-cover"/></CarouselItem>
  </CarouselContent>
  <CarouselPrevious className="t-0 b-0 left-0"/>
  <CarouselNext className="t-0 b-0 right-0"/>
</Carousel>
    </div>
  )
}
