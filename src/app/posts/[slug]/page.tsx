// app/posts/[slug]/page.tsx

import { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dayjs from 'dayjs'
import mdxComponents from '@/layout/MdxLayout'
import SiteGallery from '@/components/SiteGallery'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = allPosts.find(post => post.url === params.slug)

  return {
    title: post?.title || '404',
  }
}

export async function generateStaticParams() {
  return allPosts.map(post => ({
    slug: post.url,
  }))
}

const ArticleTags = ({ tagStr }: { tagStr: string }) => {
  return (
    <div className="flex justify-center items-center">
      {tagStr.split(',').map((tag, index) => {
        return (
          <Link
            href={`/archives/tags/${tag}`}
            className="mx-1 px-3 bg-base-200 rounded-md hover:bg-info hover:text-info-content"
            key={tag}
          >
            {tag}
          </Link>
        )
      })}
    </div>
  )
}

export default async function PostLayout({ params }: { params: { slug: string } }) {
  const post = allPosts.find(post => post.url === params.slug)

  if (!post) notFound()

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <div className="mx-auto sm:my-5 max-w-5xl py-5 sm:p-5 bg-base-100 rounded-lg overflow-hidden">
      <article className="mb-20">
        <div className="text-center -mb-4">
          <h1 className="mt-4 text-4xl font-bold">{post.title}</h1>

          <div className="flex justify-center my-3 text-xs">
            <span>发布于：</span>
            <time dateTime={post.date}>{dayjs(post.date).format('YYYY年MM月DD日')}</time>
          </div>

          {post.update && (
            <div className="flex justify-center my-3 text-xs">
              <span>更新于：</span>
              <time dateTime={post.update}>{dayjs(post.update).format('YYYY年MM月DD日')}</time>
            </div>
          )}

          {post.tag && <ArticleTags tagStr={post.tag} />}
        </div>

        <SiteGallery>
          <MDXContent components={mdxComponents} />
        </SiteGallery>
      </article>
    </div>
  )
}
