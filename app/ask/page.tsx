"use client"

import Chat from "../../components/Chat"
import Footer from "@/components/ui/Footer"
import { useSession } from "next-auth/react"

export default function Ask() {
  const { data: session } = useSession();

  return (
    <main>
      <section className="bg-gradient-to-b from-white to-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-bold mb-6 animate-fade-in">
            {session?.user?.name ? `Welcome, ${session.user.name}!` : "Ask Nutritionist AI"}
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
