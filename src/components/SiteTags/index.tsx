import { computeTags } from '@/lib/computeTags'
import Link from 'next/link'

const tagsAndCounts = computeTags()

const tags = Object.keys(tagsAndCounts).sort((a, b) => tagsAndCounts[b] - tagsAndCounts[a])

type ITagTextColor =
  | 'text-[#FFA500]'
  | 'text-[#FFD700]'
  | 'text-[#FF007F]'
  | 'text-[#00FF00]'
  | 'text-[#1E90FF]'
  | 'text-[#8A2BE2]'
  | 'text-[#FF0000]'
  | 'text-[#00FFFF]'

export default function SiteTags() {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag, index) => {
        const color = [
          'text-[#FFA500]',
          'text-[#FFD700]',
          'text-[#FF007F]',
          'text-[#00FF00]',
          'text-[#1E90FF]',
          'text-[#8A2BE2]',
          'text-[#FF0000]',
          'text-[#00FFFF]',
        ][index % 8] as ITagTextColor

        const encodedTag = encodeURI(tag)

        console.log(tag, encodedTag)

        return (
          <Link
            key={index}
            href={`/archives/tags/${encodedTag}`}
            className={`flex-1 basis-20 shrink-0 px-2 py-1 text-center ${color} whitespace-pre hover:bg-slate-100 dark:hover:bg-slate-600 rounded`}
          >
            {tag}({tagsAndCounts[tag]})
          </Link>
        )
      })}
    </div>
  )
}
