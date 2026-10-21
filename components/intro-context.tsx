'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Intro = { done: boolean; finish: () => void }

const IntroContext = createContext<Intro>({ done: true, finish: () => {} })

export const useIntro = () => useContext(IntroContext)
export const useIntroDone = () => useContext(IntroContext).done

export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setDone(true)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = done ? '' : 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [done])

  const finish = () => {
    setDone(true)
  }

  return <IntroContext.Provider value={{ done, finish }}>{children}</IntroContext.Provider>
}
