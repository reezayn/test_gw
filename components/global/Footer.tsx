import Image from 'next/image'
import Logo from '@/assets/logo.png'
import { Button } from '../ui/button'
import Link from 'next/link'
import { AiFillMessage } from 'react-icons/ai'

export default function Footer() {
  return (
    <div className="min-h-80 py-5 px-5 lg:px-10 xl:px-24 w-full border bg-black text-white border-black rounded-3xl my-1 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center w-full">
        <div className="h-[1px] w-full bg-white mx-2"></div>
        <div>
          <Image src={Logo} alt="Gurkha Warriors" className="w-60" />
        </div>
        <div className="h-[1px] w-full bg-white mx-2"></div>
      </div>
      <div className="flex flex-col w-full items-center justify-center my-3">
        <h2 className="text-2xl font-semibold mt-2">Gurkha Warriors</h2>
        <p className="text-gray-400 text-lg">Be a Warrior, Be a Gurkha 🔥</p>
      </div>
      <Button
        asChild
        className="rounded-3xl mt-7 bg-gurkhaGreen hover:bg-gurkhaGreen/90 text-black hover:text-black"
      >
        <Link href="/contact" className="flex items-center gap-x-2">
          <AiFillMessage size={17} />
          Get in touch
        </Link>
      </Button>
    </div>
  )
}
