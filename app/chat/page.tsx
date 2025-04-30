"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Chat from "@/components/Chat"
import Footer from "@/components/ui/Footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { RevealSection } from "@/components/ui/reveal-section"
import { Sparkles } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function ChatPage() {
  const [hasInteracted, setHasInteracted] = useState(false)
  const searchParams = useSearchParams()
  const startChat = searchParams.get("startChat")

  // If startChat parameter is present, auto-focus the chat
  useEffect(() => {
    if (startChat === "true") {
      const chatContainer = document.getElementById("chat-container")
      if (chatContainer) {
        chatContainer.scrollIntoView({ behavior: "smooth", block: "center" })
        setHasInteracted(true)
      }
    }
  }, [startChat])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col flex-1 min-h-[calc(100vh-4rem)] relative"
    >
      {/* Chatbot background image */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/chatbot-background.png')`,
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

      {/* Greeting section with animated elements */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center text-gray-800 pt-16 pb-8 px-4 relative"
        >
          <RevealSection>
            <div className="inline-block mb-6">
              <div className="bg-white rounded-full p-3 shadow-sm">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <Sparkles className="h-8 w-8 text-accent" />
                </motion.div>
              </div>
            </div>
            <AnimatedText
              text="Your Nutrition AI Assistant"
              className="text-3xl font-bold mb-2 font-heading block"
              animation="wave"
            />
            <motion.p className="text-lg text-gray-600 max-w-md">
              Get personalized nutrition advice instantly. Ask me anything about health, diet, and wellness.
            </motion.p>
          </RevealSection>
        </motion.div>
      )}

      {/* Chat section */}
      <div className="flex flex-col flex-1 w-full">
        <Chat onFirstInteraction={() => setHasInteracted(true)} />
      </div>

      {/* Only show footer if not interacted */}
      {!hasInteracted && <Footer />}
    </motion.main>
  )
}
