"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export function CustomBackground() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)

    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (!ctx) return

      // Set canvas dimensions
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)

      // Create food-related shapes
      const shapes = [
        { type: "apple", x: 0.1, y: 0.2, size: 0.05, color: "#f0f9ff", speed: 0.2 },
        { type: "leaf", x: 0.8, y: 0.3, size: 0.04, color: "#e0f2fe", speed: 0.15 },
        { type: "carrot", x: 0.3, y: 0.7, size: 0.06, color: "#dbeafe", speed: 0.25 },
        { type: "broccoli", x: 0.7, y: 0.8, size: 0.05, color: "#eff6ff", speed: 0.18 },
        { type: "avocado", x: 0.5, y: 0.5, size: 0.07, color: "#f0f9ff", speed: 0.22 },
        { type: "leaf", x: 0.2, y: 0.4, size: 0.03, color: "#e0f2fe", speed: 0.17 },
        { type: "apple", x: 0.9, y: 0.6, size: 0.04, color: "#dbeafe", speed: 0.19 },
        { type: "carrot", x: 0.4, y: 0.9, size: 0.05, color: "#eff6ff", speed: 0.21 },
      ]

      // Animation loop
      let animationFrame: number
      let time = 0

      const drawShape = (shape: any) => {
        const x = shape.x * canvas.width
        const y = shape.y * canvas.height + Math.sin(time * shape.speed) * 20
        const size = shape.size * Math.min(canvas.width, canvas.height)

        ctx.fillStyle = shape.color
        ctx.strokeStyle = shape.color
        ctx.lineWidth = 1

        switch (shape.type) {
          case "apple":
            // Draw apple
            ctx.beginPath()
            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fill()

            // Stem
            ctx.beginPath()
            ctx.moveTo(x, y - size)
            ctx.quadraticCurveTo(x + size / 2, y - size * 1.5, x + size / 3, y - size * 2)
            ctx.stroke()
            break

          case "leaf":
            // Draw leaf
            ctx.beginPath()
            ctx.moveTo(x, y - size)
            ctx.quadraticCurveTo(x + size * 2, y, x, y + size)
            ctx.quadraticCurveTo(x - size * 2, y, x, y - size)
            ctx.fill()

            // Stem
            ctx.beginPath()
            ctx.moveTo(x, y - size)
            ctx.lineTo(x, y + size)
            ctx.stroke()
            break

          case "carrot":
            // Draw carrot
            ctx.beginPath()
            ctx.moveTo(x, y - size * 1.5)
            ctx.lineTo(x - size, y + size)
            ctx.lineTo(x + size, y + size)
            ctx.closePath()
            ctx.fill()

            // Carrot top
            ctx.beginPath()
            ctx.moveTo(x, y - size * 1.5)
            ctx.lineTo(x - size / 2, y - size * 2.5)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(x, y - size * 1.5)
            ctx.lineTo(x, y - size * 2.5)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(x, y - size * 1.5)
            ctx.lineTo(x + size / 2, y - size * 2.5)
            ctx.stroke()
            break

          case "broccoli":
            // Draw broccoli
            ctx.beginPath()
            ctx.arc(x, y - size, size, 0, Math.PI * 2)
            ctx.fill()

            ctx.beginPath()
            ctx.arc(x - size, y - size / 2, size * 0.8, 0, Math.PI * 2)
            ctx.fill()

            ctx.beginPath()
            ctx.arc(x + size, y - size / 2, size * 0.8, 0, Math.PI * 2)
            ctx.fill()

            // Stem
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x, y + size * 1.5)
            ctx.stroke()
            break

          case "avocado":
            // Draw avocado
            ctx.beginPath()
            ctx.ellipse(x, y, size * 1.2, size * 1.5, 0, 0, Math.PI * 2)
            ctx.fill()

            // Pit
            ctx.beginPath()
            ctx.arc(x, y, size * 0.5, 0, Math.PI * 2)
            ctx.fillStyle = "#f8fafc"
            ctx.fill()
            break
        }
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw grid pattern
        ctx.strokeStyle = "#f1f5f9"
        ctx.lineWidth = 0.5

        const gridSize = 40
        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }

        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }

        // Draw gradient overlay
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(0.5, "rgba(240, 249, 255, 0.6)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.8)")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw shapes
        shapes.forEach(drawShape)

        time += 0.01
        animationFrame = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener("resize", resizeCanvas)
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white"></div>

      {/* Canvas for custom animated elements */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-bl-full opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-tr-full opacity-40"></div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%233b82f6' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Animated floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-50 opacity-20"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-50 opacity-20"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  )
}
