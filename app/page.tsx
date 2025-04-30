"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Footer from "@/components/ui/Footer"
import { motion } from "framer-motion"
import { ArrowRight, Leaf } from "lucide-react"
import SimpleFaq from "@/components/SimpleFaq"
import TestimonialSlider from "@/components/TestimonialSlider"

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-textMain font-body overflow-hidden"
    >
      {/* Food background image */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/food-background.png')`,
            opacity: 1,
          }}
        />

        {/* Overlay to soften the image */}
        <div className="absolute inset-0 bg-white/80" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%232A7F62' fillOpacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center py-20">
          <div className="text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-textMain">
                Your Personal <br />
                Nutrition Assistant
              </h1>
              <p className="text-lg md:text-xl text-textLight mb-8 max-w-lg mx-auto md:mx-0">
                AskNutritionist is your smart, AI-powered health companion— get answers to your nutrition questions
                instantly and confidently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/chat">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden group"
                  >
                    <span className="relative block bg-accent text-white px-8 py-4 rounded-xl transition-colors duration-300 font-medium shadow-lg">
                      Start Chatting <ArrowRight className="ml-2 h-5 w-5 inline" />
                    </span>
                  </motion.div>
                </Link>
                <Link href="/about">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="text-base px-8 py-4 rounded-xl border-accent text-textMain hover:bg-accent/5 transition-all duration-300 w-full sm:w-auto shadow-md"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-accent/20">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-4">
                  <motion.div
                    className="bg-accentLight p-4 rounded-lg"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <p className="text-textMain">How can I improve my diet to boost energy levels?</p>
                  </motion.div>
                  <motion.div
                    className="bg-accent/10 p-4 rounded-lg"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <p className="text-textMain">
                      To boost energy, focus on complex carbs like whole grains, lean proteins, healthy fats, and
                      staying hydrated. Eat smaller, frequent meals and include foods rich in B vitamins, iron, and
                      magnesium.
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-accentLight p-4 rounded-lg"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <p className="text-textMain">What foods should I eat to support muscle recovery?</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Simplified */}
      <section className="py-16 relative overflow-hidden bg-accent/5">
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="relative bg-white rounded-full p-3 shadow-md">
                <Leaf className="h-6 w-6 text-accent" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent">Why Choose AskNutritionist?</h2>
            <p className="text-lg text-textMain max-w-2xl mx-auto">
              Our AI-powered platform provides personalized guidance to help you achieve your health goals.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Slider Section */}
      <section className="py-16 relative overflow-hidden bg-white">
        <TestimonialSlider />
      </section>

      {/* FAQ Section */}
      <section className="py-16 relative overflow-hidden">
        <SimpleFaq />
      </section>

      {/* Final CTA Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 z-0 bg-accent"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to take control of your nutrition?</h2>
            <motion.p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Start your journey to better health today with personalized guidance from our AI nutritionist.
            </motion.p>
            <motion.div>
              <Link href="/chat">
                <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Button className="relative bg-white text-accent hover:bg-accent/5 text-base px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                    Start Chatting Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </motion.main>
  )
}
