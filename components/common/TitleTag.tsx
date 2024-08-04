export default function TitleTag({ tagText }: { tagText: string }) {
  return (
    <div className="font-extralight max-w-28 text-white text-center border border-white py-1 px-3 text-xs my-2 rounded-full uppercase">
      {tagText}
    </div>
  )
}
