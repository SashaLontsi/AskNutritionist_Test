"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function NatureBackground() {
  const [leaves, setLeaves] = useState<JSX.Element[]>([])

  useEffect(() => {
    // Create initial leaves
    createLeaves(15)

    // Add more leaves periodically
    const interval = setInterval(() => {
      createLeaves(1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const createLeaves = (count: number) => {
    const newLeaves: JSX.Element[] = []

    for (let i = 0; i < count; i++) {
      const leafType = Math.floor(Math.random() * 3) + 1
      const leafSize = Math.random() * 20 + 10 // 10-30px
      const startPositionX = Math.random() * 100 // 0-100%
      const startPositionY = -leafSize // Start above the viewport
      const fallDuration = Math.random() * 15 + 10 // 10-25s
      const delay = Math.random() * 5 // 0-5s
      const rotation = Math.random() * 360 // 0-360deg
      const horizontalMovement = Math.random() * 40 - 20 // -20 to 20%

      newLeaves.push(
        <div
          key={`leaf-${Date.now()}-${i}`}
          className="falling-leaf"
          style={{
            left: `${startPositionX}%`,
            top: `${startPositionY}px`,
            width: `${leafSize}px`,
            height: `${leafSize}px`,
            ...({ '--fall-duration': `${fallDuration}s` } as React.CSSProperties),
            animationDelay: `${delay}s`,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <Image
            src={`/leaf${leafType}.svg`}
            alt="Leaf"
            width={leafSize}
            height={leafSize}
            style={{
              filter: `hue-rotate(${Math.random() * 30 - 15}deg)`,
              transform: `translateX(${horizontalMovement}%)`,
              transition: `transform ${fallDuration}s ease-in-out`,
            }}
          />
        </div>,
      )
    }

    setLeaves((prev) => [...prev, ...newLeaves])
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Wave pattern background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
      <div className="absolute bottom-0 left-0 w-full">
        <Image src="/wave-pattern.svg" alt="Wave pattern" width={1440} height={320} className="w-full" />
      </div>

      {/* Dotted pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('/circle-pattern.svg')`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Subtle gradient overlays */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-bl-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-accent/5 to-secondary/5 rounded-tr-full blur-3xl" />

      {/* Falling leaves */}
      {leaves}
    </div>
  )
}
