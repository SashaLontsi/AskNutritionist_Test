"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function SimpleFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does AskNutritionist work?",
      answer:
        "AskNutritionist uses AI technology trained on nutritional science to provide personalized answers to your health and nutrition questions. Simply type your question, and our AI will provide evidence-based guidance tailored to your needs.",
    },
    {
      question: "Is the nutrition advice reliable?",
      answer:
        "Yes, our AI is trained on peer-reviewed nutritional science and regularly updated with the latest research. However, our service is not a substitute for professional medical advice, especially for specific health conditions.",
    },
    {
      question: "Can I get personalized meal plans?",
      answer:
        "You can ask for meal plan suggestions based on your dietary preferences, restrictions, and goals. Our AI can help you create balanced meal plans that align with your nutritional needs.",
    },
    {
      question: "Is AskNutritionist free to use?",
      answer: "Yes, AskNutritionist is completely free. You can ask unlimited nutrition-related questions anytime.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 font-heading text-accent">Frequently Asked Questions</h2>
        <p className="text-textLight max-w-2xl mx-auto">
          Find answers to common questions about our AI nutrition assistant.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border border-accent/20 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <motion.button
              onClick={() => toggleFaq(index)}
              className="flex justify-between items-center w-full p-5 text-left font-medium focus:outline-none group"
              whileHover={{ backgroundColor: "rgba(42, 127, 98, 0.05)" }}
            >
              <span className="text-lg group-hover:text-accent transition-colors duration-300 text-textMain">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="bg-accent/10 rounded-full p-1"
              >
                <ChevronDown className="h-5 w-5 text-accent" />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 pb-5 text-textLight">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
