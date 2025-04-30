"use client"

import { useEffect, useRef } from "react"

export function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrame: number

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawBackground()
    }

    function drawBackground() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fill with white background
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid pattern
      ctx.strokeStyle = "#2A7F62"
      ctx.lineWidth = 0.5
      ctx.globalAlpha = 0.03

      const gridSize = 60
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

      // Draw a few minimal diagonal lines
      ctx.globalAlpha = 0.02
      ctx.lineWidth = 1
      ctx.strokeStyle = "#2A7F62"

      for (let i = 0; i < 5; i++) {
        const x1 = Math.random() * canvas.width
        const y1 = 0
        const x2 = Math.random() * canvas.width
        const y2 = canvas.height

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      // Draw a few minimal horizontal lines with varying opacity
      for (let i = 0; i < 3; i++) {
        const y = Math.random() * canvas.height
        ctx.globalAlpha = 0.01 + Math.random() * 0.02
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      ctx.globalAlpha = 1.0

      animationFrame = requestAnimationFrame(drawBackground)
    }

    // Add event listener and start animation
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base canvas for background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Very subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%232A7F62' fillOpacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px",
        }}
      ></div>
    </div>
  )
}
