import { Metadata } from 'next'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import SiteHeader from '@/layout/HeaderLayout'
import SiteScrollTop from '@/components/SiteScrollTop'
import dataConfig from 'data'

export const metadata: Metadata = {
  title: 'Blog of djdg626',
  description: '博客,IT,技术,生活,日常分享,教程,前端,JavaScript',
  verification: {
    other: {
      'baidu-site-verification': 'codeva-oWPv6vmEax',
    },
  },
}

const SiteSearch = dynamic(() => import('@/components/SiteSearch'), { ssr: true })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // 主题初始化脚本 - 在页面渲染前执行，避免闪烁
            const themeLight = "${dataConfig.themeLight}";
            const themeDark = "${dataConfig.themeDark}";
            const defaultTheme = "${dataConfig.defaultTheme}";

            // 优先级：localStorage > 系统偏好
            const savedTheme = localStorage.getItem('data-theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const isDark = savedTheme === themeDark || (!savedTheme && (systemPrefersDark || defaultTheme === themeDark));

            // 应用主题
            const theme = isDark ? themeDark : themeLight;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('data-theme', theme);

            // 设置dark类
            if (isDark) {
              document.documentElement.classList.add('dark');
            }
          `
        }} />
        <meta name="baidu-site-verification" content="codeva-hoe6twosR8" />
      </head>
      <body>
        <div className="relative pt-[5.5rem] flex flex-col min-h-screen text-base-content bg-base-200 dark:bg-[#2a303c] transition-colors">
          <SiteHeader />
          <main className="flex-grow px-4 bg-base-100 sm:bg-inherit">{children}</main>

          <SiteSearch />

          <Script src="/iconfont.js" strategy="lazyOnload" />
        </div>

        <SiteScrollTop />

        <Analytics />
      </body>
    </html>
  )
}
