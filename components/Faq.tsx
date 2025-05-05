"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

type FaqProps = {
  staggered?: boolean
}

export default function Faq({ staggered = false }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does AskNutritionist work?",
      answer:
        "AskNutritionist uses advanced AI technology trained on nutritional science to provide personalized answers to your health and nutrition questions. Simply type your question, and our AI will analyze it and provide evidence-based guidance tailored to your needs.",
    },
    {
      question: "Is the nutrition advice reliable?",
      answer:
        "Yes, our AI is trained on peer-reviewed nutritional science and regularly updated with the latest research. However, while we strive for accuracy, our service is not a substitute for professional medical advice, especially for specific health conditions.",
    },
    {
      question: "Can I get personalized meal plans?",
      answer:
        "You can ask for meal plan suggestions based on your dietary preferences, restrictions, and goals. Our AI can help you create balanced meal plans that align with your nutritional needs.",
    },
    {
      question: "Is my data kept private?",
      answer:
        "We take your privacy seriously. Your conversations are encrypted and we don't share your personal information with third parties. We may use anonymized data to improve our service, but your identity remains protected.",
    },
    {
      question: "Can I use AskNutritionist if I have dietary restrictions?",
      answer:
        "Yes! Our AI can provide guidance for various dietary restrictions including vegetarian, vegan, gluten-free, dairy-free, and many others. Just mention your specific restrictions when asking questions.",
    },
    {
      question: "Is AskNutritionist free to use?",
      answer: "Yes, AskNutritionist is completely free. You can ask unlimited nutrition-related questions anytime.",
    },
    {
      question: "Does this replace a real nutritionist?",
      answer: "No. It's a helpful assistant, not a substitute for a certified healthcare professional.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-16">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-block mb-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-md opacity-70" />
            <div className="relative bg-white dark:bg-gray-800 rounded-full p-3 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-accent"
                aria-labelledby="faqIconTitle"
              >
                <title id="faqIconTitle">Help Icon</title>
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-2 font-heading"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Find answers to common questions about our AI nutrition assistant.
        </motion.p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.question}
            initial={staggered ? { opacity: 0, y: 20 } : { opacity: 1 }}
            whileInView={staggered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: staggered ? index * 0.1 : 0 }}
            viewport={{ once: true }}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <motion.button
              onClick={() => toggleFaq(index)}
              className="flex justify-between items-center w-full p-5 text-left font-medium focus:outline-none group"
              whileHover={{ backgroundColor: "rgba(240, 253, 244, 0.5)" }}
            >
              <span className="text-lg group-hover:text-accent transition-colors duration-300">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full p-1"
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
                  <div className="px-5 pb-5 text-gray-700 dark:text-gray-300">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
