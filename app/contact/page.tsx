"use client"

import Link from "next/link"

import type React from "react"
import { useState } from "react"
import { Mail, MessageSquare, User, Send, CheckCircle, MapPin, Phone, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Footer from "@/components/ui/Footer"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative"
    >
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-teal-50/30 to-white -z-10"></div>

      {/* Animated wave patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-20 -z-10">
        <svg className="absolute w-full min-w-[1000px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="url(#gradient1)"
            strokeWidth="2"
            stroke="rgba(16, 185, 129, 0.2)"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
              <stop offset="100%" stopColor="rgba(20, 184, 166, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Dotted pattern background */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <svg width="100%" height="100%">
          <pattern
            id="pattern-circles"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(3)"
          >
            <circle cx="10" cy="10" r="1.5" fill="#10b981" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>

      {/* Header Section */}
      <section className="pt-16 pb-12 text-center">
        <div className="inline-block mb-6">
          <div className="bg-white rounded-full p-3 shadow-sm">
            <Mail className="h-8 w-8 text-accent" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 font-heading">Get in Touch</h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Whether you're curious about features, have feedback, or just want to say hi, we'd love to hear from you.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="p-8">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Your Name
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="pl-10 w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white/70"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="pl-10 w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white/70"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Your Message
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-4 text-gray-400" size={18} />
                          <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="How can we help you?"
                            rows={5}
                            className="pl-10 w-full py-3 px-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white/70"
                            required
                          />
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative w-full overflow-hidden group"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg blur-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative flex items-center justify-center w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-lg transition-colors duration-300 font-medium">
                          {loading ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message <Send className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="bg-white rounded-full p-3 shadow-sm">
                      <CheckCircle className="h-12 w-12 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-gray-700 mb-6 max-w-md">
                      Your message has been sent successfully. We'll get back to you as soon as possible.
                    </p>
                    <motion.button
                      onClick={() => {
                        setSubmitted(false)
                        setForm({ name: "", email: "", message: "" })
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-accent hover:text-accentDark font-medium flex items-center"
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Information Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-semibold mb-6 relative inline-block">
                Contact Information
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500"></span>
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="relative mr-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-sm opacity-30"></div>
                    <div className="relative bg-accentLight rounded-full p-2">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Our Location</p>
                    <p className="text-gray-700 mt-1">123 Nutrition Street, Health City, 10001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="relative mr-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-sm opacity-30"></div>
                    <div className="relative bg-accentLight rounded-full p-2">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Us</p>
                    <p className="text-gray-700 mt-1">contact@asknutritionist.com</p>
                    <p className="text-gray-700">support@asknutritionist.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="relative mr-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-sm opacity-30"></div>
                    <div className="relative bg-accentLight rounded-full p-2">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Call Us</p>
                    <p className="text-gray-700 mt-1">+1 (555) 123-4567</p>
                    <p className="text-gray-700">+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="relative mr-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-sm opacity-30"></div>
                  <div className="relative bg-accentLight rounded-full p-2">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold">Office Hours</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Monday - Friday</span>
                  <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Saturday</span>
                  <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-700">Sunday</span>
                  <span className="font-medium text-gray-900">Closed</span>
                </li>
              </ul>
            </div>

            {/* Quick Help Card */}
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)" }}
              className="relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600"></div>

              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-white/5"
                ></motion.div>
                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 40,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-white/5"
                ></motion.div>
              </div>

              <div className="relative p-8 text-white">
                <h3 className="text-2xl font-semibold mb-4">Need Immediate Help?</h3>
                <p className="mb-6 text-white/90">
                  For urgent inquiries, you can use our AI assistant to get quick answers to your nutrition questions.
                </p>
                <Link href="/chat">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-lg blur-md"></div>
                      <span className="relative block bg-white text-accent hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors duration-300 shadow-lg">
                        Chat with AI Now
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.main>
  )
}
