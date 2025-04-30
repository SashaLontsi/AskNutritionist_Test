"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  // First slide
  {
    id: 1,
    name: "John Smith",
    username: "@johnsmith",
    content: "This nutrition app has completely transformed my eating habits. The personalized advice is spot on!",
    rating: 5,
    color: "from-green-400 to-emerald-500",
    slide: 0,
  },
  {
    id: 2,
    name: "Emma Wilson",
    username: "@emmaw",
    content:
      "I've been using this for 3 months and my energy levels have improved dramatically. Great recommendations!",
    rating: 5,
    color: "from-pink-400 to-purple-500",
    slide: 0,
  },
  {
    id: 3,
    name: "Robert Chen",
    username: "@robchen",
    content: "The meal planning feature saved me so much time. I no longer stress about what to cook each day.",
    rating: 4,
    color: "from-blue-400 to-indigo-500",
    slide: 0,
  },

  // Second slide
  {
    id: 4,
    name: "Sarah Johnson",
    username: "@sarahj",
    content:
      "Being diabetic, I needed specific advice. This app provides safe recommendations that keep my blood sugar stable.",
    rating: 5,
    color: "from-orange-400 to-amber-500",
    slide: 1,
  },
  {
    id: 5,
    name: "David Miller",
    username: "@davidm",
    content: "The meal suggestions are creative and delicious. I never get bored with my healthy eating plan now!",
    rating: 4,
    color: "from-teal-400 to-cyan-500",
    slide: 1,
  },
  {
    id: 6,
    name: "Priya Patel",
    username: "@priyap",
    content:
      "As someone with multiple food allergies, this app has been a lifesaver. It suggests alternatives I never thought of!",
    rating: 5,
    color: "from-red-400 to-rose-500",
    slide: 1,
  },

  // Third slide
  {
    id: 7,
    name: "Michael Torres",
    username: "@michaelt",
    content:
      "As a fitness trainer, I recommend this to all my clients. The nutrition guidance complements their workout routines perfectly.",
    rating: 5,
    color: "from-violet-400 to-purple-500",
    slide: 2,
  },
  {
    id: 8,
    name: "Emily Clark",
    username: "@emilyc",
    content:
      "As a busy mom, I appreciate the quick meal ideas that are both kid-friendly and nutritious. My whole family loves it!",
    rating: 4,
    color: "from-amber-400 to-yellow-500",
    slide: 2,
  },
  {
    id: 9,
    name: "Alex Wong",
    username: "@alexw",
    content:
      "The app helped me identify food sensitivities I didn't know I had. I've seen a huge improvement in my digestive health.",
    rating: 5,
    color: "from-emerald-400 to-green-500",
    slide: 2,
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3)
  }

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        handleNext()
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, currentIndex])

  const visibleTestimonials = testimonials.filter((t) => t.slide === currentIndex % 3)

  return (
    <div
      className="relative max-w-6xl mx-auto px-4 py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-accent font-heading">What Our Users Say</h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-white border border-accent/20 text-accent hover:bg-accent/5 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white border border-accent/20 text-accent hover:bg-accent/5 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              custom={direction}
              variants={slideVariants}
              initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl shadow-md p-6 border border-accent/10"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-textMain">{testimonial.name}</h3>
                  <p className="text-sm text-textLight">{testimonial.username}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-textMain">{testimonial.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex % 3 ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex % 3 ? "bg-accent" : "bg-accent/20"
            }`}
            aria-label={`Go to testimonial slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
