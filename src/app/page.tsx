// app/page.tsx
import { allPosts } from 'contentlayer/generated'
import dayjs from 'dayjs'
import SiteSidebar from '@/components/SiteSidebar'
import ListLayout from '@/layout/ListLayout'
import dataConfig from 'data'

export default function List() {
  const posts = allPosts.sort((a, b) => (dayjs(a.date).isBefore(b.date) ? 1 : -1)).slice(0, dataConfig.totalPageSize)

  return (
    <>
      <div className="mx-auto max-w-5xl py-8 flex">
        <div className="flex-1">
          {/* <SiteSlide /> */}

          <ListLayout currentPage={1} posts={posts} />
        </div>

        <SiteSidebar />
      </div>
    </>
  )
}
