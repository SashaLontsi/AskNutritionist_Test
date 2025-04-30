"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    rating: 5,
    title: "Best app ever!",
    body: "This app has been a game-changer for me! It's made tracking my daily nutrition so much easier. I love how intuitive and user-friendly it is.",
    author: "Jonas Aly — Founder @ Company",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    rating: 5,
    title: "Super helpful to stay on track",
    body: "I can't thank this app enough for helping me build healthier habits. The reminders are spot on and it keeps me motivated!",
    author: "Mark Bures — Nutrition Coach",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    rating: 5,
    title: "Great guidance & peace of mind",
    body: "The recommendations are clear, reliable, and super easy to follow. It's like having a nutritionist in my pocket.",
    author: "William Kolas — Student",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    rating: 4,
    title: "Helpful insights daily",
    body: "I now understand my eating patterns so much better. The feedback and insights really changed the way I think about food.",
    author: "Andrew Chan — Health Blogger",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16" ref={ref}>
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block mb-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-md opacity-70"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
              <Quote className="h-6 w-6 text-accent" />
            </div>
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold mb-2 font-heading"
        >
          What Our Users Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Discover how AskNutritionist is helping people improve their nutrition and health.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{
              y: -10,
              boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)",
              scale: 1.02,
            }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 relative group"
          >
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full p-2 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Quote className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="flex space-x-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i + testimonial.rating} className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                ))}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{testimonial.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{testimonial.body}</p>
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-sm opacity-70"></div>
                <div className="relative bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-3">
                  {testimonial.author.charAt(0)}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.author}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
