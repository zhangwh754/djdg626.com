'use client'

import React, { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const headerNavLinks = [
  { href: '/', title: '首页' },
  { href: '/archives/posts', title: '归档' },
  // { href: '/tags', title: '标签' },
]

const ToggleTheme = dynamic(() => import('./ToggleTheme'), { ssr: true })
const ToggleMenuShow = dynamic(() => import('./ToggleMenuShow'), { ssr: true })
const ToggleSearchShow = dynamic(() => import('./ToggleSearchShow'), { ssr: true })

function HeaderLeft() {
  return (
    <Link href={'/'} className="text-xl font-bold">
      学习小结
    </Link>
  )
}

function HeaderRight(props: { display: Boolean; toggleMenuShow: Function }) {
  return (
    <>
      <nav className="hidden ml-auto text-base font-medium sm:block">
        {headerNavLinks.map(link => (
          <Link key={link.href} className="p-1 sm:p-4" href={link.href}>
            {link.title}
          </Link>
        ))}
      </nav>

      {props.display && (
        <div className="fixed top-0 left-0 z-10 h-full w-full transform opacity-95 duration-300 ease-in-out bg-base-200 translate-x-0">
          <div className="h-[5.5rem] px-4 flex justify-end items-center">
            <ToggleMenuShow display={true} toggleMenuShow={() => props.toggleMenuShow()} />
          </div>
          <nav className="flex flex-col items-start px-8 text-2xl font-bold">
            {headerNavLinks.map(link => (
              <Link key={link.href} className="p-4" href={link.href} onClick={() => props.toggleMenuShow(false)}>
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}

export default function Header() {
  const [display, setDisplay] = useState(false)

  const toggleMenuShow = useCallback((display: Boolean) => {
    if (display) {
      document.documentElement.classList.add('overflow-hidden')
      setDisplay(true)
    } else {
      document.documentElement.classList.remove('overflow-hidden')
      setDisplay(false)
    }
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex h-[5.5rem] bg-base-100 border-b border-base-200 z-[99]">
        <div className="px-4 mx-auto max-w-5xl flex-1 flex justify-between items-center">
          <HeaderLeft />
          <HeaderRight display={display} toggleMenuShow={() => toggleMenuShow(false)} />
          <ToggleTheme />
          <ToggleSearchShow />
          <ToggleMenuShow display={false} toggleMenuShow={() => toggleMenuShow(true)} />
        </div>
      </header>
    </>
  )
}
