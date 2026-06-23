'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Moon, Sun, ExternalLink } from 'lucide-react'

export function Navbar() {
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Dataset', href: '#dataset' },
    { label: 'Analysis', href: '#analysis' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="#home" className="flex items-center gap-2 text-xl font-bold text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-black font-bold">
                S
              </div>
              <span>SkinAI</span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <a
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Source Link */}
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Source code"
            >
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </nav>
  )
}
