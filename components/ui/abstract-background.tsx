"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type { JSX } from "react"

export function AbstractBackground() {
  const [particles, setParticles] = useState<JSX.Element[]>([])
  const [shapes, setShapes] = useState<JSX.Element[]>([])

  useEffect(() => {
    // Create initial particles and shapes
    createParticles(20)
    createShapes(5)
  }, [])

  const createParticles = (count: number) => {
    const newParticles: JSX.Element[] = []

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 20 + 5 // 5-25px
      const positionX = Math.random() * 100 // 0-100%
      const positionY = Math.random() * 100 // 0-100%
      const duration = Math.random() * 20 + 10 // 10-30s
      const delay = Math.random() * 5 // 0-5s
      const opacity = Math.random() * 0.3 + 0.1 // 0.1-0.4

      // Choose a color from our palette
      const colors = ["#ff6b6b", "#4ecdc4", "#ffb347", "#845ec2"]
      const color = colors[Math.floor(Math.random() * colors.length)]

      newParticles.push(
        <div
          key={`particle-${Date.now()}-${i}`}
          className="floating-particle"
          style={{
            left: `${positionX}%`,
            top: `${positionY}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            opacity: opacity,
            "--move-duration": `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        ></div>,
      )
    }

    setParticles(newParticles)
  }

  const createShapes = (count: number) => {
    const newShapes: JSX.Element[] = []

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 300 + 100 // 100-400px
      const positionX = Math.random() * 100 // 0-100%
      const positionY = Math.random() * 100 // 0-100%
      const duration = Math.random() * 30 + 20 // 20-50s
      const delay = Math.random() * 10 // 0-10s
      const opacity = Math.random() * 0.15 + 0.05 // 0.05-0.2
      const rotation = Math.random() * 360 // 0-360deg

      // Choose a gradient from our palette
      const gradients = [
        "linear-gradient(45deg, #ff6b6b, #ffb347)",
        "linear-gradient(45deg, #4ecdc4, #845ec2)",
        "linear-gradient(45deg, #ffb347, #4ecdc4)",
        "linear-gradient(45deg, #845ec2, #ff6b6b)",
      ]
      const gradient = gradients[Math.floor(Math.random() * gradients.length)]

      newShapes.push(
        <div
          key={`shape-${Date.now()}-${i}`}
          className="abstract-shape"
          style={{
            left: `${positionX}%`,
            top: `${positionY}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: gradient,
            opacity: opacity,
            transform: `rotate(${rotation}deg)`,
            "--shift-duration": `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        ></div>,
      )
    }

    setShapes(newShapes)
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>

      {/* Abstract shapes */}
      {shapes}

      {/* Floating particles */}
      {particles}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(255, 107, 107, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(78, 205, 196, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 179, 71, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(132, 94, 194, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(255, 107, 107, 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      ></motion.div>
    </div>
  )
}
