import Image from 'next/image'

import Link from 'next/link'

import Icon from '../SiteIcon'
import SiteTags from '../SiteTags'

function SiteHeroSection() {
  return (
    <>
      <div className="px-4 py-6 flex h-64 flex-col items-center bg-base-100 rounded-lg">
        <Image className="rounded-full hover:animate-spin" src="/avatar.jpg" width={96} height={96} alt="头像"></Image>

        <div className="text-xl font-bold">djdg626</div>
        <div className="flex mt-4 items-center">
          <span>上海某菜鸡前端</span>
        </div>
        <div className="mt-4 flex justify-center">
          {/* <Icon name="bilibili" className="ml-3 w-6 h-6 text-info"></Icon> */}

          <Link
            href={`tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=1840863933&website=www.oicqzone.com`}
            target="_blank"
          >
            <Icon name="qq" className="ml-3 w-6 h-6"></Icon>
          </Link>

          <Link href={`https://github.com/zhangwh754`} target="_blank">
            <Icon name="github" className="ml-3 w-6 h-6"></Icon>
          </Link>
        </div>
      </div>

      <style></style>
    </>
  )
}

function SiteCategorySection() {
  return (
    <>
      <div className="mt-8 px-4 py-6 bg-base-100 rounded-lg">
        <div className="flex items-center text-info [&>.icon]:cursor-default">
          <div>标签</div>
          <Icon name="menu" className="ml-3 w-4 h-4"></Icon>
        </div>

        <SiteTags />
      </div>
    </>
  )
}

export default function SiteSidebar() {
  return (
    <div className="hidden sm:block ml-4 lg:w-72 w-56">
      <SiteHeroSection />

      <SiteCategorySection />
    </div>
  )
}
