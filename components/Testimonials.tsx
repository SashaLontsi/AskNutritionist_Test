"use client"

import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "John Smith",
    username: "@johnsmith",
    content: "This nutrition app has completely transformed my eating habits. The personalized advice is spot on!",
    rating: 5,
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 2,
    name: "Emma Wilson",
    username: "@emmaw",
    content:
      "I've been using this for 3 months and my energy levels have improved dramatically. Great recommendations!",
    rating: 5,
    color: "from-pink-400 to-purple-500",
  },
  {
    id: 3,
    name: "Robert Chen",
    username: "@robchen",
    content: "The meal planning feature saved me so much time. I no longer stress about what to cook each day.",
    rating: 4,
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    username: "@sarahj",
    content:
      "Being diabetic, I needed specific advice. This app provides safe recommendations that keep my blood sugar stable.",
    rating: 5,
    color: "from-orange-400 to-amber-500",
  },
  {
    id: 5,
    name: "David Miller",
    username: "@davidm",
    content: "The meal suggestions are creative and delicious. I never get bored with my healthy eating plan now!",
    rating: 4,
    color: "from-teal-400 to-cyan-500",
  },
  {
    id: 6,
    name: "Priya Patel",
    username: "@priyap",
    content:
      "As someone with multiple food allergies, this app has been a lifesaver. It suggests alternatives I never thought of!",
    rating: 5,
    color: "from-red-400 to-rose-500",
  },
  {
    id: 7,
    name: "Michael Torres",
    username: "@michaelt",
    content:
      "As a fitness trainer, I recommend this to all my clients. The nutrition guidance complements their workout routines perfectly.",
    rating: 5,
    color: "from-violet-400 to-purple-500",
  },
  {
    id: 8,
    name: "Emily Clark",
    username: "@emilyc",
    content:
      "As a busy mom, I appreciate the quick meal ideas that are both kid-friendly and nutritious. My whole family loves it!",
    rating: 4,
    color: "from-amber-400 to-yellow-500",
  },
  {
    id: 9,
    name: "Alex Wong",
    username: "@alexw",
    content:
      "The app helped me identify food sensitivities I didn't know I had. I've seen a huge improvement in my digestive health.",
    rating: 5,
    color: "from-emerald-400 to-green-500",
  },
]

export default function Testimonials() {
  const [page, setPage] = useState(0)
  const testimonialsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)

  const startIdx = page * testimonialsPerPage
  const endIdx = startIdx + testimonialsPerPage
  const visibleTestimonials = testimonials.slice(startIdx, endIdx)

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16" aria-label="Testimonials">
      <div className="text-center mb-16 relative">
        <h2 className="text-3xl font-bold text-accent font-heading mb-2">What Our Users Say</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Discover how AskNutritionist is helping people improve their nutrition and health.
        </p>
        <div className="absolute right-0 top-0 flex gap-2 mt-2 justify-end">
          <button
            type="button"
            aria-label="Scroll testimonials left"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="p-2 rounded-full bg-white border border-accent/20 text-accent hover:bg-accent/5 transition-colors shadow"
            disabled={page === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Scroll testimonials right"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="p-2 rounded-full bg-white border border-accent/20 text-accent hover:bg-accent/5 transition-colors shadow"
            disabled={page === totalPages - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
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
                  key={`${testimonial.id}-star-${i}`}
                  className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-textMain">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
