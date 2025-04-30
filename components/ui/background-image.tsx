"use client"

import { useEffect, useState } from "react"

interface BackgroundImageProps {
  imagePath: string
  opacity?: number
}

export function BackgroundImage({ imagePath, opacity = 0.15 }: BackgroundImageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${imagePath})`,
          
        }}
      />

      {/* Overlay to soften the image */}
      

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%232A7F62' fillOpacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px", filter: "brightness(1.6) contrast(1.5)"
        }}
      />
    </div>
  )
}
