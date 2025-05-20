// contentlayer.config.ts
import crypto from 'crypto'

import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import { calculateReadingTimeWithImages } from './src/lib/getReadTime'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    update: { type: 'date', required: false },
    description: { type: 'string', required: false },
    tag: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => generateShortLink(post._raw.flattenedPath),
    },
    readTime: {
      type: 'number',
      resolve: post => calculateReadingTimeWithImages(post.body.raw),
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode as any,
        {
          theme: 'github-dark',
          onVisitLine(node) {
            ;(node.properties.className as any) = 'line'
          },
          onVisitHighlightedLine(node) {
            ;(node.properties.className as any) += ' highlighted'
          },
        } satisfies Partial<PrettyCodeOptions>,
      ],
    ],
  },
})

// 使用SHA-256哈希函数生成唯一短链接
function generateShortLink(fileName: string) {
  const hash = crypto.createHash('sha256')
  hash.update(fileName)
  const shortLink = hash.digest('hex').slice(0, 10) // 取哈希值的前10个字符
  return shortLink
}
