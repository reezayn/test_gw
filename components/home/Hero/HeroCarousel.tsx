'use client'
import { useState, useEffect, useRef } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import BentoBigPic1 from '@/assets/bento-bigpic-1.png'
import BentoBigPic2 from '@/assets/bento-bigpic-2.png'
import BentoBigPic3 from '@/assets/bento-bigpic-3.png'
import TitleTag from '@/components/common/TitleTag'

const carouselItems = [
  {
    image: BentoBigPic1,
    titleTag: 'About us',
    text: 'Get ready for a rollercoaster of fun, laughter, and adrenaline as contestants tackle a series of obstacle courses inspired by popular shows like Ninja Warrior, Wipe Out, and Survivor.',
  },
  {
    image: BentoBigPic2,
    titleTag: 'Right now',
    text: "Join us for an unforgettable adventure where you'll test your limits, make new friends, and create memories that will last a lifetime.",
  },
  {
    image: BentoBigPic3,
    titleTag: 'Right now',
    text: "Join us for an unforgettable adventure where you'll test your limits, make new friends, and create memories that will last a lifetime.",
  },
]

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${activeIndex * 100}%)`
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out'
    }
  }, [activeIndex])

  return (
    <div className="relative w-full h-full pointer-events-none">
      <Carousel opts={{ loop: true }} className="w-full h-full">
        <CarouselContent ref={carouselRef} className="flex w-full h-full">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="w-full h-full flex-shrink-0">
              <div className="flex items-center justify-center p-0 h-screen">
                <div className="w-full h-full relative overflow-hidden rounded-3xl shadow-lg">
                  <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
                  <Image
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover z-0"
                  />
                  <div className="absolute px-10 bottom-32 left-5 flex flex-col items-start justify-center z-20 text-white">
                    <TitleTag tagText={item.titleTag}/>
                    <p className="text-xl">{item.text}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          onClick={() =>
            setActiveIndex(
              (prevIndex) =>
                (prevIndex - 1 + carouselItems.length) % carouselItems.length
            )
          }
          className="absolute z-[10000] pointer-events-auto p-1 h-20 w-20 text-white text-7xl left-4 top-1/2 transform -translate-y-1/2 bg-transparent border border-white rounded-full"
        />
        <CarouselNext
          onClick={() =>
            setActiveIndex(
              (prevIndex) => (prevIndex + 1) % carouselItems.length
            )
          }
          className="absolute z-[10000] pointer-events-auto p-1 h-20 w-20 text-white text-7xl right-4 top-1/2 transform -translate-y-1/2 bg-transparent border border-white rounded-full"
        />
      </Carousel>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {carouselItems.map((_, index) => (
          <div
            key={index}
            className={`w-28 h-1 rounded-lg ${
              index === activeIndex ? 'bg-white' : 'bg-gray-500'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}
