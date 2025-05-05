"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Chat from "@/components/Chat"
import Footer from "@/components/ui/Footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { RevealSection } from "@/components/ui/reveal-section"
import { Sparkles, MessageSquare } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useSession, signIn, getProviders } from "next-auth/react"
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react"

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [hasInteracted, setHasInteracted] = useState(false)
  const searchParams = useSearchParams()
  const startChat = searchParams.get("startChat")
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov as Record<string, ClientSafeProvider>));
  }, []);

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

  if (status === "loading") {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <main>
      <section className="bg-gradient-to-b from-white to-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-bold mb-6 animate-fade-in">
            {session?.user?.name ? `Welcome, ${session.user.name}!` : "Chat with Nutritionist AI"}
          </h1>
          <p className="text-lg text-textLight max-w-3xl mx-auto animate-slide-up">
            Get personalized nutrition advice instantly. Ask about meal plans, dietary restrictions, nutritional values, or any health-related questions.
          </p>
        </div>
      </section>

      <section className="section-container pb-24 pt-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Chat />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
