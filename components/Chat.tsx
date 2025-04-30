"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { PaperPlaneIcon, StopIcon } from "@radix-ui/react-icons"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Sparkles, Clock, X, History, Trash } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type Conversation = {
  id: string
  title: string
  preview: string
  messages: Message[]
  timestamp: Date
}

export default function Chat({ onFirstInteraction }: { onFirstInteraction?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Protein Sources",
      preview: "What are good sources of protein?",
      messages: [
        {
          id: "1-1",
          role: "user",
          content: "What are good sources of protein?",
          timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
        },
        {
          id: "1-2",
          role: "assistant",
          content:
            "Good sources of protein include lean meats, fish, eggs, dairy, legumes, nuts, and seeds. Plant-based options like tofu, tempeh, and seitan are excellent for vegetarians and vegans.",
          timestamp: new Date(Date.now() - 86400000 * 2),
        },
      ],
      timestamp: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: "2",
      title: "Weight Loss Tips",
      preview: "How can I lose weight in a healthy way?",
      messages: [
        {
          id: "2-1",
          role: "user",
          content: "How can I lose weight in a healthy way?",
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
        },
        {
          id: "2-2",
          role: "assistant",
          content:
            "Sustainable weight loss typically involves a balanced diet with a moderate calorie deficit, regular physical activity, adequate sleep, and stress management. Focus on whole foods, plenty of vegetables, lean proteins, and staying hydrated.",
          timestamp: new Date(Date.now() - 86400000),
        },
      ],
      timestamp: new Date(Date.now() - 86400000),
    },
  ])
  const [currentConversation, setCurrentConversation] = useState<string | null>(null)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    // Only scroll to bottom when messages change
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // This effect ensures the chat container is visible when the component mounts
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    if (onFirstInteraction) {
      onFirstInteraction()
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
    setIsLoading(true)
    setIsTyping(true)

    // Generate a response based on the input
    const fullReply = generateResponse(input)
    const replyId = (Date.now() + 1).toString()

    // Add empty message first to show typing indicator
    setMessages((prev) => [...prev, { id: replyId, role: "assistant", content: "", timestamp: new Date() }])

    // Simulate typing with a delay
    setTimeout(() => {
      let i = 0
      intervalRef.current = setInterval(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === replyId ? { ...msg, content: fullReply.slice(0, i + 1), timestamp: new Date() } : msg,
          ),
        )
        i++
        if (i === fullReply.length) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          setIsLoading(false)
          setIsTyping(false)

          // Save conversation to history
          if (!currentConversation) {
            const newConversationId = Date.now().toString()
            const newConversation: Conversation = {
              id: newConversationId,
              title: input.length > 20 ? input.substring(0, 20) + "..." : input,
              preview: input,
              messages: [userMessage, { id: replyId, role: "assistant", content: fullReply, timestamp: new Date() }],
              timestamp: new Date(),
            }
            setConversations((prev) => [newConversation, ...prev])
            setCurrentConversation(newConversationId)
          } else {
            setConversations((prev) =>
              prev.map((conv) => {
                if (conv.id === currentConversation) {
                  return {
                    ...conv,
                    messages: [
                      ...conv.messages,
                      userMessage,
                      { id: replyId, role: "assistant", content: fullReply, timestamp: new Date() },
                    ],
                    timestamp: new Date(),
                  }
                }
                return conv
              }),
            )
          }
        }
      }, 8)
    }, 500)
  }

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const loadConversation = (conversationId: string) => {
    const conversation = conversations.find((conv) => conv.id === conversationId)
    if (conversation) {
      setMessages(conversation.messages)
      setCurrentConversation(conversationId)
      setShowHistory(false)
    }
  }

  const startNewConversation = () => {
    setMessages([])
    setCurrentConversation(null)
    setShowHistory(false)
  }

  const deleteConversation = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setConversations((prev) => prev.filter((conv) => conv.id !== conversationId))
    if (currentConversation === conversationId) {
      setMessages([])
      setCurrentConversation(null)
    }
  }

  // Function to generate responses based on input
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! I'm your nutrition assistant. How can I help you today?"
    }

    if (input.includes("protein") || input.includes("proteins")) {
      return "Good sources of protein include lean meats, fish, eggs, dairy, legumes, nuts, and seeds. Plant-based options like tofu, tempeh, and seitan are excellent for vegetarians and vegans. For optimal health, aim to include a variety of protein sources in your diet."
    }

    if (input.includes("weight loss") || input.includes("lose weight")) {
      return "Sustainable weight loss typically involves a balanced diet with a moderate calorie deficit, regular physical activity, adequate sleep, and stress management. Focus on whole foods, plenty of vegetables, lean proteins, and staying hydrated. Remember that healthy weight loss is usually gradual, around 1-2 pounds per week."
    }

    if (input.includes("vitamin") || input.includes("mineral")) {
      return "Vitamins and minerals are essential micronutrients. A varied diet with plenty of fruits, vegetables, whole grains, and proteins usually provides adequate amounts. Specific deficiencies may require targeted foods or supplements. If you're concerned about a specific vitamin or mineral, please ask and I can provide more detailed information."
    }

    if (input.includes("meal plan") || input.includes("diet plan")) {
      return "A balanced meal plan typically includes a variety of foods from all food groups: fruits, vegetables, whole grains, lean proteins, and healthy fats. Portion control is also important. Would you like me to suggest a sample meal plan based on specific dietary preferences or goals?"
    }

    return (
      "Thank you for your question about " +
      userInput +
      ". To provide you with the most accurate nutrition advice, I'd need a bit more information. Could you please elaborate on your specific concerns or goals? I'm here to help with personalized nutrition guidance."
    )
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return "Today"
    } else if (diffInDays === 1) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="fjlex flex-col h-full max-w-5xl mx-auto w-full relative" ref={chatContainerRef} id="chat-container">
      {/* Chat container*/}
      <div className="flex-1 flex flex-col justify-center items-center min-h-[70vh] px-4 py-8">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-white rounded-full p-2 shadow-sm">
                  <MessageSquare className="h-5 w-5 text-accent" />
                </div>
              </div>
              <div>
                <h2 className="font-medium text-gray-900">Nutrition Assistant</h2>
                <p className="text-xs text-gray-500">Powered by AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-accent transition-colors p-1 rounded-md hover:bg-gray-100"
              >
                <History className="h-4 w-4" />
                <span>History</span>
              </button>
              <div className="flex items-center space-x-1">
                <span className="inline-flex h-2 w-2 rounded-full bg-green-400"></span>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>

          <div className="flex h-[50vh]">
            {/* Chat history sidebar */}
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "300px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-r border-gray-100 bg-gray-50 overflow-hidden"
                >
                  <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium text-sm">Chat History</h3>
                    <button
                      onClick={() => setShowHistory(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={startNewConversation}
                      className="w-full p-2 mb-3 text-sm text-left rounded-lg bg-accent text-white flex items-center space-x-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>New Conversation</span>
                    </button>
                    <div className="space-y-2 max-h-[calc(50vh-100px)] overflow-y-auto">
                      {conversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          onClick={() => loadConversation(conversation.id)}
                          className={`p-2 rounded-lg text-sm cursor-pointer transition-colors flex flex-col ${
                            currentConversation === conversation.id
                              ? "bg-accent/10 border-l-2 border-accent"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="font-medium truncate">{conversation.title}</div>
                            <button
                              onClick={(e) => deleteConversation(conversation.id, e)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="text-xs text-gray-500 truncate">{conversation.preview}</div>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{formatDate(conversation.timestamp)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat messages */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 flex-1 overflow-y-auto space-y-6 bg-gradient-to-b from-white to-gray-50">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <motion.div
                      className="inline-block mb-4"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <div className="bg-white rounded-full p-3 shadow-sm">
                        <Sparkles className="h-8 w-8 text-accent" />
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-medium mb-2 text-gray-900">How can I help you today?</h3>
                    <p className="text-gray-500 mb-6">Ask me anything about nutrition and health!</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <SuggestionButton
                        text="What foods are high in protein?"
                        onClick={() => setInput("What foods are high in protein?")}
                      />
                      <SuggestionButton
                        text="How can I improve my diet?"
                        onClick={() => setInput("How can I improve my diet?")}
                      />
                      <SuggestionButton
                        text="What's a good meal plan for weight loss?"
                        onClick={() => setInput("What's a good meal plan for weight loss?")}
                      />
                      <SuggestionButton
                        text="Tell me about vitamins and minerals"
                        onClick={() => setInput("Tell me about vitamins and minerals")}
                      />
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className="flex w-full">
                      <div
                        className={`max-w-[80%] flex ${message.role === "user" ? "ml-auto" : "mr-auto"} items-start gap-3`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex-shrink-0 mt-1 bg-white rounded-full p-1.5 shadow-sm">
                            <MessageSquare className="h-5 w-5 text-accent" />
                          </div>
                        )}
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`inline-block text-sm break-words ${
                            message.role === "user"
                              ? "px-5 py-3 bg-accent text-white rounded-2xl rounded-tr-none shadow-md"
                              : "px-5 py-3 bg-white text-gray-900 rounded-2xl rounded-tl-none shadow-md border border-gray-100"
                          }`}
                        >
                          {message.content}
                          {message.role === "assistant" && message.content === "" && (
                            <div className="flex space-x-1 h-6 items-center">
                              <div
                                className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              ></div>
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={bottomRef} />
              </div>

              {/* Chat input */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <motion.form
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  onSubmit={handleSubmit}
                  className="flex items-end gap-2 bg-gray-50 rounded-xl w-full group shadow-sm border border-gray-100 overflow-hidden"
                >
                  <textarea
                    ref={textareaRef}
                    className="flex-1 resize-none border-none bg-transparent outline-none text-base text-gray-900 placeholder:text-gray-400 max-h-32 min-h-[52px] leading-relaxed p-3 overflow-y-auto"
                    value={input}
                    placeholder="Ask about nutrition, diet plans, or health advice..."
                    onChange={(e) => {
                      setInput(e.target.value)
                      if (textareaRef.current) {
                        textareaRef.current.style.height = "auto"
                        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                    rows={1}
                    disabled={isLoading}
                  />
                  <motion.button
                    type="button"
                    onClick={isLoading ? handleStop : handleSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 m-1 rounded-full ${
                      isLoading
                        ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        : "bg-accent text-white hover:bg-accentDark"
                    } transition-colors duration-300 shadow-md`}
                    disabled={!input.trim() && !isLoading}
                  >
                    {isLoading ? <StopIcon className="h-5 w-5" /> : <PaperPlaneIcon className="h-5 w-5" />}
                  </motion.button>
                </motion.form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SuggestionButton({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white p-3 rounded-lg text-sm cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm text-left flex items-center space-x-2 group"
    >
      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
        <Sparkles className="h-3 w-3 text-accent" />
      </div>
      <span>{text}</span>
    </motion.button>
  )
}
