// HeroBento.tsx
import { Button } from '@/components/ui/button'
import { LuMoveRight } from 'react-icons/lu'
import BentoSmallPic1 from '@/assets/bento-smallpic-1.png'
import Image from 'next/image'
import { HeroCarousel } from './HeroCarousel'
import Link from 'next/link'

export default function HeroBento() {
  return (
    <div className="flex flex-col-reverse lg:flex-row w-full lg:h-[calc(100vh-84px)] gap-1">
      <div className="w-full lg:w-[43%] flex flex-col gap-1">
        <div className="w-full h-1/2 border border-black rounded-3xl bg-gray-900 p-5 text-white flex flex-col justify-between">
          <h1 className="text-7xl font-bold">
            Take your game to the next level
          </h1>
          <div className="w-full">
            <Button
              asChild
              className="w-1/2 bg-white hover:bg-gurkhaGreen text-black rounded-full flex items-center gap-x-7 py-6 text-lg border border-black"
            >
              <Link href="/book">
                Book your seat today <LuMoveRight size={28} />
              </Link>
            </Button>
          </div>
        </div>
        <div className="w-full h-1/2 flex gap-1 ">
          <div className="h-full w-1/2 border border-black rounded-3xl relative overflow-hidden">
            <Image
              src={BentoSmallPic1}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-full w-1/2 border border-black rounded-3xl flex flex-col justify-between p-5 bg-slate-100">
            <h2 className="text-7xl font-[800]">25+</h2>
            <h3 className="text-5xl font-bold">Challenges & Courses</h3>
            <div className="w-full">
              <Button className="bg-white hover:bg-gurkhaGreen text-black rounded-full flex items-center gap-x-7 py-6 text-lg border border-black">
                Learn more <LuMoveRight size={28} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[57%] border border-black rounded-3xl relative overflow-hidden h-full">
        <HeroCarousel />
      </div>
    </div>
  )
}
