"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Leaf, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AuthButton from "@/components/AuthButton"
import { useSession } from "next-auth/react"

const tabs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Chat", href: "/chat" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])

  const activeIndex = tabs.findIndex((tab) => tab.href === pathname)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (hoveredIndex !== null && tabRefs.current[hoveredIndex]) {
      const el = tabRefs.current[hoveredIndex]
      if (el) {
        setHoverStyle({ left: `${el.offsetLeft}px`, width: `${el.offsetWidth}px` })
      }
    }
  }, [hoveredIndex])

  useEffect(() => {
    const el = tabRefs.current[activeIndex]
    if (el) {
      setActiveStyle({ left: `${el.offsetLeft}px`, width: `${el.offsetWidth}px` })
    }
  }, [activeIndex])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-lg py-3" : "bg-white/60 backdrop-blur-md py-5"
      } border-b border-accent/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <Leaf className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-heading text-xl font-bold text-accent relative">
              AskNutritionist
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <nav className="relative mr-4">
              {/* Hover highlight */}
              <div
                className="absolute h-[30px] transition-all duration-300 ease-out bg-accent/10 rounded-md"
                style={{
                  ...hoverStyle,
                  opacity: hoveredIndex !== null ? 1 : 0,
                }}
              />

              {/* Active underline */}
              <div
                className="absolute bottom-[-6px] h-[2px] bg-accent transition-all duration-300 ease-out"
                style={activeStyle}
              />

              <div className="flex space-x-1 relative z-10">
                {tabs.map((tab, index) => (
                  <div
                    key={tab.name}
                    ref={(el) => {
                      tabRefs.current[index] = el
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Link
                      href={tab.href}
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        pathname === tab.href ? "text-accent bg-accent/10" : "text-textMain hover:text-accent hover:bg-accent/5"
                      }`}
                    >
                      {tab.name}
                    </Link>
                  </div>
                ))}
              </div>
            </nav>

            {!session && (
              <>
                <Link href="/login">
                  <button type="button" className="ml-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium text-sm shadow-sm hover:bg-accentDark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-300">
                    Log in
                  </button>
                </Link>
                <Link href="/signup">
                  <button type="button" className="ml-2 px-5 py-2.5 rounded-full border border-accent text-accent font-medium text-sm shadow-sm bg-white hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-300">
                    Sign up
                  </button>
                </Link>
              </>
            )}
            {session && <AuthButton />}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-textMain hover:bg-accent/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 backdrop-blur-xl border-t border-accent/10 shadow-lg"
          >
            <div className="container mx-auto px-4 py-5 space-y-3">
              {tabs.map((tab, index) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    pathname === tab.href
                      ? "bg-accent/10 text-accent border-l-4 border-accent pl-3" : "text-textMain hover:bg-accent/5 hover:text-accent"
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
              <div className="pt-3 pb-1">
                {!session && (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <button type="button" className="block w-full bg-accent hover:bg-accentDark text-white px-4 py-3 rounded-xl text-center transition-colors duration-300 font-medium text-sm shadow-md mb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                        Log in
                      </button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <button type="button" className="block w-full border border-accent text-accent bg-white hover:bg-accent/10 px-4 py-3 rounded-xl text-center transition-colors duration-300 font-medium text-sm shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                        Sign up
                      </button>
                    </Link>
                  </>
                )}
                {session && <AuthButton />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
