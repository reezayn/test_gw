import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import { BsArrowRight } from 'react-icons/bs'

export default function GreenCircleButton({
  text,
  link,
}: {
  text: string
  link?: string
}) {
  return (
    <Button
      asChild
      className="w-20 h-20 rounded-full bg-gurkhaGreen text-black hover:bg-gurkhaGreen/85"
    >
      {link ? (
        <Link href={link}>
          {text !== '' ? text : <BsArrowRight size={30} />}
        </Link>
      ) : (
        <span>{text !== '' ? text : <BsArrowRight size={30} />}</span>
      )}
    </Button>
  )
}
