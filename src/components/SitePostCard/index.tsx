import { Post } from 'contentlayer/generated'
import dayjs from 'dayjs'
import Link from 'next/link'

export default function PostCard(post: Post) {
  const tags = post.tag ? post.tag.split(',') : ['默认']

  return (
    <div className="mb-8 px-2 sm:px-4 py-6 mx-auto bg-base-100 shadow-md rounded-lg group">
      <div className="flex justify-between items-center mb-4">
        <time className="text-sm text-gray-500 dark:text-gray-200" dateTime={post.date}>
          {dayjs(post.date).format('YYYY年MM月DD日')}
        </time>
        <div className="flex items-center">
          {tags.map(tag => (
            <Link key={tag} href={`/archives/tags/${tag}`}>
              <span className="text-sm ml-2 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-primary dark:text-primary-content rounded-full">
                #{tag}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{post.description || '暂无描述'}</p>
      <div className="flex justify-between items-center mt-3 pt-3 border-t">
        <span className="text-sm text-gray-500 dark:text-gray-200">预计阅读时间：{post.readTime}分钟</span>

        <Link prefetch href={`/posts/${post.url}`}>
          <button className="btn btn-sm btn-secondary hover:btn-active">阅读全文</button>
        </Link>
      </div>
    </div>
  )
}
