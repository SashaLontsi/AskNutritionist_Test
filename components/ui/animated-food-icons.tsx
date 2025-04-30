"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedFoodIcons() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Add any initialization if needed
  }, [])

  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none opacity-10">
      <svg ref={svgRef} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="food-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Apple */}
            <motion.path
              d="M50 40C45 40 40 45 35 50C30 55 30 65 30 75C30 85 35 95 40 100C45 105 55 110 65 110C75 110 85 105 90 100C95 95 100 85 100 75C100 65 100 55 95 50C90 45 85 40 80 40C70 40 60 40 50 40Z"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
            />
            <motion.path
              d="M65 40C65 40 75 50 75 60"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            {/* Leaf */}
            <motion.path
              d="M150 40C150 40 120 40 100 60C80 80 90 120 90 120C90 120 130 120 150 100C170 80 150 40 150 40Z"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.path
              d="M95 80C95 80 100 85 105 85"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Carrot */}
            <motion.path
              d="M60 150L40 170L80 210L100 190L60 150Z"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.path
              d="M80 210L85 230C85 230 70 240 50 240C30 240 20 230 20 230L40 210"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.7,
              }}
            />

            {/* Broccoli */}
            <motion.circle
              cx="150"
              cy="150"
              r="20"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.2,
              }}
            />
            <motion.circle
              cx="130"
              cy="165"
              r="15"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
            <motion.circle
              cx="170"
              cy="165"
              r="15"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.8,
              }}
            />
            <motion.path
              d="M150 170L150 230"
              stroke="#3b82f6"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 2.1,
              }}
            />
          </pattern>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#food-pattern)" />
      </svg>
    </div>
  )
}
