import { Metadata } from 'next'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import SiteHeader from '@/layout/HeaderLayout'
import SiteScrollTop from '@/components/SiteScrollTop'

export const metadata: Metadata = {
  title: '学习小结',
  description: '博客,IT,工程,技术,生活,日常分享,教程,前端,JavaScript',
}

const SiteSearch = dynamic(() => import('@/components/SiteSearch'), { ssr: true })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="relative pt-[5.5rem] flex flex-col min-h-screen text-base-content bg-base-200 dark:bg-[#2a303c] transition-colors">
          <SiteHeader />
          <main className="flex-grow px-4 bg-base-100 sm:bg-inherit">{children}</main>

          <SiteSearch />

          <Script src="/blog/iconfont.js" strategy="lazyOnload" />
        </div>

        <SiteScrollTop />

        <Analytics />
      </body>
    </html>
  )
}
