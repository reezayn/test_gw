import GreenCircleButton from '@/components/common/GreenCircleButton'
import TitleTag from '@/components/common/TitleTag'
import Image from 'next/image'
import Link from 'next/link'
import HomeAboutPic from '@/assets/home-about.png'
import { LuBadgeInfo } from 'react-icons/lu'

export default function HomeAbout() {
  return (
    <div id="homeAbout" className="">
      <div className="my-1 h-40 w-full border border-black rounded-3xl flex items-center justify-between px-5">
        <h1 className="text-6xl font-bold">About Us</h1>
      </div>
      <div className="h-[432px] rounded-3xl border border-black w-full flex flex-col-reverse lg:flex-row">
        <div className="w-full h-full px-8 py-8 lg:w-[40%] bg-black text-white rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl flex flex-col justify-between">
          <div>
            <TitleTag tagText="Adventure" />
            <h1 className="text-5xl my-5">We believe in adventure</h1>
            <p className="text-lg text-gray-400">
              We combines thrilling physical challenges with hilarious tasks
              that guarantee entertainment for the whole family. Each episode
              features contestants from diverse backgrounds who must navigate
              through unique and engaging obstacle courses. As participants
              overcome each level, the challenges become tougher and wilder.
            </p>
          </div>
          <Link href="/about" className="flex items-center justify-start w-fit">
            <GreenCircleButton text="" />
            <p className="mx-4 text-gray-100">Learn more about us</p>
          </Link>
        </div>
        <div className="w-full h-full lg:w-[60%] relative overflow-hidden">
          <Image
            src={HomeAboutPic}
            alt=""
            className="w-full h-full object-cover rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-1 pt-1 min-h-80">
        <div className="w-full cursor-cell lg:w-1/2 border border-black bg-black text-white hover:text-gurkhaGreen rounded-3xl p-5">
          <h1 className="text-9xl font-bold">Gurkha Warrior</h1>
        </div>
        <div className="w-full lg:w-1/2 border border-black rounded-3xl p-5 bg-green-50">
          <div className="bg-black text-gurkhaGreen w-fit p-4 rounded-full">
            <LuBadgeInfo size={60} className="" />
          </div>
          <p className="my-4 text-xl">
            Gurkha Warriors is a family-friendly show featuring contestants
            from various backgrounds tackling entertaining and unique obstacle
            courses. Each episode combines thrilling physical challenges with
            amusing tasks, with difficulty increasing as participants advance
            through the levels.
          </p>
        </div>
        <Link
          href="/about"
          className="cursor-alias w-full lg:w-1/2 bg-black text-white border border-black rounded-3xl p-5 flex flex-col items-center justify-center"
        >
          <div className="my-3">
            <GreenCircleButton text="" />
          </div>
          <div className="text-2xl">Know more</div>
        </Link>
      </div>
    </div>
  )
}
