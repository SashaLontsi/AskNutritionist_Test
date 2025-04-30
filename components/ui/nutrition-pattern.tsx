"use client"

import { useEffect, useState } from "react"

export function NutritionPattern() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white"></div>

      {/* Nutrition-themed patterns */}
      <div className="absolute inset-0 nutrition-pattern opacity-30"></div>
      <div className="absolute inset-0 leaf-pattern opacity-20"></div>
      <div className="absolute inset-0 fruit-pattern opacity-25"></div>

      {/* Accent areas */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-full opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-tr-full opacity-40"></div>
    </div>
  )
}
