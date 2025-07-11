'use client'

import { useEffect, useState } from 'react'
import Icon from '@/components/SiteIcon'
import { useThemeStore } from 'stores/theme-store'
import { shallow } from 'zustand/shallow'
import dataConfig from 'data'

function ToggleTheme() {
  const [mounted, setMounted] = useState(false)
  const { isDark, toggleDark, setDark } = useThemeStore(
    state => ({
      isDark: state.isDark,
      toggleDark: state.toggleDark,
      setDark: state.setDark,
    }),
    shallow
  )

  useEffect(() => {
    // 页面已经通过内联脚本初始化了主题，这里只需要同步状态
    const savedTheme = localStorage.getItem('data-theme') || dataConfig.defaultTheme
    const isDarkTheme = savedTheme === dataConfig.themeDark

    // 同步Zustand状态与localStorage
    if (isDarkTheme !== isDark) {
      setDark(isDarkTheme)
    }

    // 标记组件已挂载
    setMounted(true)
  }, [isDark, setDark])

  if (!mounted) {
    return null
  }

  const switchTheme = () => {
    // 切换主题
    const newIsDark = !isDark
    const theme = newIsDark ? dataConfig.themeDark : dataConfig.themeLight

    // 更新状态
    toggleDark()

    // 更新DOM和localStorage
    localStorage.setItem('data-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)

    // 更新dark类
    if (newIsDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <>
      <button
        aria-label="Toggle Dark Mode"
        className="ml-auto sm:ml-1 p-1 rounded-md w-8 h-8 flex justify-center items-center"
        onClick={() => switchTheme()}
      >
        {isDark ? (
          <Icon name="light" className={`w-4 h-4`}></Icon>
        ) : (
          <Icon name="dark" className={`w-4 h-4`}></Icon>
        )}
      </button>
    </>
  )
}

export default ToggleTheme
