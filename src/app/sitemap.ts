import { allPosts } from 'contentlayer/generated'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // 基础域名
  const baseUrl = 'https://www.084612.xyz'

  // 获取所有文章
  const posts = allPosts.map(post => ({
    url: `${baseUrl}/posts/${post.url}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 获取所有标签
  const allTags: string[] = []
  allPosts.forEach(post => {
    if (post.tag) {
      const tags = post.tag.split(',')
      tags.forEach(tag => {
        if (!allTags.includes(tag)) {
          allTags.push(tag)
        }
      })
    }
  })

  const tags = allTags.map(tag => ({
    url: `${baseUrl}/archives/tags?tag=${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // 计算分页数量
  const totalPosts = allPosts.length
  const postsPerPage = 10 // 假设每页10篇文章
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  // 生成分页路由
  const pages = Array.from({ length: totalPages }, (_, i) => ({
    url: i === 0 ? baseUrl : `${baseUrl}/page/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: i === 0 ? 1.0 : 0.8,
  }))

  // 基础路由
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/archives/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/archives/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  return [...routes, ...posts, ...tags, ...pages.slice(1)]
}
