"use client"

import { useEffect, useRef } from "react"

export function MinimalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrame: number

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawBackground()
    }

    function drawBackground() {
      if (!canvas || !ctx) return;
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fill with white background
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw extremely subtle grid
      ctx.strokeStyle = "#2A7F62"
      ctx.lineWidth = 0.3
      ctx.globalAlpha = 0.02

      const gridSize = 80
      for (let x = 0; x < (canvas ? canvas.width : 0); x += gridSize) {
        if (!ctx) continue;
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas ? canvas.height : 0)
        ctx.stroke()
      }

      for (let y = 0; y < (canvas ? canvas.height : 0); y += gridSize) {
        if (!ctx) continue;
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas ? canvas.width : 0, y)
        ctx.stroke()
      }

      // Draw a single subtle wave at the bottom
      ctx.globalAlpha = 0.03
      ctx.beginPath()
      ctx.moveTo(0, canvas ? canvas.height - 100 : 0)

      for (let x = 0; x < (canvas ? canvas.width : 0); x += 20) {
        if (!ctx || !canvas) continue;
        const amplitude = 30
        const frequency = 0.01
        const y = canvas.height - 100 + amplitude * Math.sin(x * frequency)
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas ? canvas.width : 0, canvas ? canvas.height : 0)
      ctx.lineTo(0, canvas ? canvas.height : 0)
      ctx.closePath()
      ctx.fillStyle = "#2A7F62"
      ctx.fill()

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
    </div>
  )
}
