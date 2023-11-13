import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from "lucide-react"

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => {
        if (theme === "dark") {
          setTheme("light")
        } else {
          setTheme("dark")
        }
      }}
    >
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark-rotate-90 dark:scale-0' />
      <Sun className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-90 transition-all dark-rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}

export default ThemeToggleButton
