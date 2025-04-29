import { allPosts as _allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { computeTags } from '@/lib/computeTags'
import SiteArchives from '@/layout/SiteArchives'

function getTags() {
  const tagsAndCounts = computeTags()

  return Object.keys(tagsAndCounts).map(tag => ({
    tag: tag,
  }))
}

// 获取所有可能的标签参数
export async function generateStaticParams() {
  const tags = _allPosts
    .map(post => (post.tag ? post.tag.split(',').map(tag => tag.trim()) : ['默认']))
    .flat()
    .filter((item, index, arr) => arr.indexOf(item) === index)

  return tags.map(tag => ({
    tag: encodeURI(tag),
  }))
}

export default function SitePostsByTag({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)
  const tags = getTags().map(item => item.tag)

  if (!tags.includes(tag)) throw notFound()

  return <SiteArchives tag={tag} />
}
