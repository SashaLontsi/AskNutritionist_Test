"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { PaperPlaneIcon, StopIcon } from "@radix-ui/react-icons"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Sparkles, Clock, X, History, Trash } from "lucide-react"
import { useSession } from "next-auth/react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type Conversation = {
  id?: string // local id for new conversations
  _id?: string // MongoDB id for saved conversations
  title: string
  preview: string
  messages: Message[]
  timestamp: Date
  createdAt?: string | Date
}

type EditHistory = {
  content: string
  editedAt: string | Date
}

export default function Chat({ onFirstInteraction }: { onFirstInteraction?: () => void }) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState<string>("")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const limit = 10

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editMessageContent, setEditMessageContent] = useState<string>("")
  const [showHistoryFor, setShowHistoryFor] = useState<string | null>(null)
  const [loadingConversations, setLoadingConversations] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [showDeleteId, setShowDeleteId] = useState<string | null>(null)

  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [])

  const fetchConversations = useCallback(async (pageNum = 1) => {
    if (!session) return
    setLoadingConversations(true)
    try {
      const res = await fetch(`/api/chat-history?page=${pageNum}&limit=${limit}`)
      const data = await res.json()
      if (pageNum === 1) {
        setConversations(
          Array.isArray(data.conversations)
            ? data.conversations.map((conv: Conversation) => ({
                ...conv,
                id: conv._id || conv.id,
                timestamp: conv.createdAt ? new Date(conv.createdAt) : new Date(),
              }))
            : []
        )
      } else {
        setConversations((prev) => [
          ...prev,
          ...(Array.isArray(data.conversations)
            ? data.conversations.map((conv: Conversation) => ({
                ...conv,
                id: conv._id || conv.id,
                timestamp: conv.createdAt ? new Date(conv.createdAt) : new Date(),
              }))
            : []),
        ])
      }
      setHasMore(pageNum < data.totalPages)
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to fetch conversations.' })
    } finally {
      setLoadingConversations(false)
    }
  }, [session])

  useEffect(() => {
    if (session) {
      setPage(1)
      fetchConversations(1)
    }
  }, [session, fetchConversations])

  const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
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

    try {
      const response = await fetch('/api/smart-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from server')
      }

      const data = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (!currentConversation) {
        const newConversationId = Date.now().toString()
        // Auto-generate title from first user message
        const autoTitle = input.trim().length > 0 ? input.trim().slice(0, 30) : "New Conversation"
        const newConversation: Conversation = {
          id: newConversationId,
          title: autoTitle,
          preview: input,
          messages: [userMessage, assistantMessage],
          timestamp: new Date(),
        }
        setConversations((prev) => [newConversation, ...prev])
        setCurrentConversation(newConversationId)
        // Save to backend
        if (session) {
          fetch("/api/chat-history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: newConversation.title,
              messages: newConversation.messages,
            }),
          })
            .then((res) => res.json())
            .then((saved) => {
              setConversations((prev) => prev.map((conv) =>
                conv.id === newConversationId && saved._id
                  ? { ...conv, _id: saved._id, id: saved._id }
                  : conv
              ))
              setCurrentConversation(saved._id)
              setToast({ type: 'success', message: 'Conversation saved!' })
            })
            .catch((err) => setToast({ type: 'error', message: 'Failed to save conversation.' }))
        }
      } else {
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === currentConversation) {
              return {
                ...conv,
                messages: [...conv.messages, userMessage, assistantMessage],
                timestamp: new Date(),
              }
            }
            return conv
          }),
        )
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to get response from server.' })
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting to the server. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
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
    const conversation = conversations.find((conv) => conv.id === conversationId || conv._id === conversationId)
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
    setShowDeleteId(conversationId)
  }

  const confirmDeleteConversation = (conversationId: string) => {
    setConversations((prev) => prev.filter((conv) => (conv.id || conv._id) !== conversationId))
    if (currentConversation === conversationId) {
      setMessages([])
      setCurrentConversation(null)
    }
    // Delete from backend if _id is present
    const conv = conversations.find((c) => (c.id || c._id) === conversationId)
    const backendId = conv?._id || conv?.id
    if (backendId) {
      fetch(`/api/chat-history?id=${backendId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => setToast({ type: 'success', message: 'Conversation deleted.' }))
        .catch((err) => setToast({ type: 'error', message: 'Failed to delete conversation.' }))
    }
    setShowDeleteId(null)
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return "Today"
    }
    if (diffInDays === 1) {
      return "Yesterday"
    }
    return date.toLocaleDateString()
  }

  const handleEditTitle = (convId: string, currentTitle: string) => {
    setEditingId(convId)
    setEditTitle(currentTitle)
  }

  const saveEditTitle = async (convId: string) => {
    const res = await fetch("/api/chat-history", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: convId, title: editTitle }),
    })
    if (res.ok) {
      setConversations((prev) =>
        prev.map((conv) =>
          (conv.id || conv._id) === convId ? { ...conv, title: editTitle } : conv
        )
      )
      setEditingId(null)
    }
  }

  const handleEditMessage = (msgId: string, content: string) => {
    setEditingMessageId(msgId)
    setEditMessageContent(content)
  }

  const saveEditMessage = async (msgId: string) => {
    if (!currentConversation) return
    const res = await fetch("/api/chat-history", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: currentConversation,
        messageId: msgId,
        newContent: editMessageContent,
      }),
    })
    if (res.ok) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === msgId ? { ...msg, content: editMessageContent } : msg
        )
      )
      setEditingMessageId(null)
    }
  }

  // Export chat history
  const exportChatHistory = () => {
    const dataStr = JSON.stringify(conversations, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'chat-history.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Import chat history
  const importChatHistory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string)
        if (Array.isArray(imported)) {
          setConversations(imported)
          setToast({ type: 'success', message: 'Chat history imported!' })
        } else {
          setToast({ type: 'error', message: 'Invalid file format.' })
        }
      } catch {
        setToast({ type: 'error', message: 'Failed to import chat history.' })
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="fjlex flex-col h-full max-w-5xl mx-auto w-full relative" ref={chatContainerRef} id="chat-container">
      {/* Chat container*/}
      <div className="flex-1 flex flex-col justify-center items-center min-h-[70vh] px-4 py-8">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <MessageSquare className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-base font-semibold leading-tight">Nutrition Assistant</h2>
                  <p className="text-xs text-gray-400 leading-tight">Powered by AI</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-accent transition-colors p-1 rounded-md hover:bg-gray-100"
              >
                <History className="h-4 w-4" />
                <span>History</span>
              </button>
              <div className="flex items-center space-x-1">
                <span className="inline-flex h-2 w-2 rounded-full bg-green-400" />
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
                      type="button"
                      onClick={() => setShowHistory(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={startNewConversation}
                      className="w-full p-2 mb-3 text-sm text-left rounded-lg bg-accent text-white flex items-center space-x-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>New Conversation</span>
                    </button>
                    {loadingConversations && (
                      <div className="flex justify-center items-center py-2">
                        <span className="loader border-2 border-gray-300 border-t-accent rounded-full w-6 h-6 animate-spin" />
                      </div>
                    )}
                    <div className="space-y-2 max-h-[calc(50vh-100px)] overflow-y-auto">
                      {conversations.map((conversation) => (
                        <button
                          type="button"
                          key={conversation.id || conversation._id || ""}
                          onClick={() => loadConversation((conversation.id || conversation._id || "") as string)}
                          onKeyDown={(e) => e.key === 'Enter' && loadConversation((conversation.id || conversation._id || "") as string)}
                          className={`p-2 rounded-lg text-sm cursor-pointer transition-colors flex flex-col w-full text-left ${
                            currentConversation === conversation.id
                              ? "bg-accent/10 border-l-2 border-accent"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            {editingId === (conversation.id || conversation._id) ? (
                              <>
                                <input
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  className="border rounded px-1 text-sm mr-1"
                                />
                                <button type="button" className="text-green-600 mr-1" onClick={() => saveEditTitle((conversation.id || conversation._id || "") as string)}>Save</button>
                                <button type="button" className="text-gray-400" onClick={() => setEditingId(null)}>Cancel</button>
                              </>
                            ) : (
                              <>
                                <div className="font-medium truncate">{conversation.title}</div>
                                <button
                                  type="button"
                                  onClick={() => handleEditTitle((conversation.id || conversation._id || "") as string, conversation.title)}
                                  className="text-gray-400 hover:text-blue-500 transition-colors p-1 mr-1"
                                  title="Edit title"
                                >
                                  ✏️
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => deleteConversation((conversation.id || conversation._id || "") as string, e)}
                                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                >
                                  <Trash className="h-3 w-3" />
                                </button>
                              </>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{conversation.preview}</div>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{formatDate(conversation.timestamp)}</span>
                          </div>
                        </button>
                      ))}
                      {hasMore && (
                        <button
                          type="button"
                          onClick={() => {
                            const nextPage = page + 1
                            setPage(nextPage)
                            fetchConversations(nextPage)
                          }}
                          className="w-full p-2 mt-2 text-sm bg-gray-200 rounded"
                        >
                          Load More
                        </button>
                      )}
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
                          {editingMessageId === message.id ? (
                            <>
                              <textarea
                                value={editMessageContent}
                                onChange={(e) => setEditMessageContent(e.target.value)}
                                className="border border-accent bg-white text-gray-900 rounded px-2 py-1 text-sm mr-2 w-64 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                                placeholder="Edit your message..."
                                rows={2}
                              />
                              <button type="button" className="text-green-600 mr-1" onClick={() => saveEditMessage(message.id)}>Save</button>
                              <button type="button" className="text-gray-400" onClick={() => setEditingMessageId(null)}>Cancel</button>
                            </>
                          ) : (
                            <>
                              {message.content}
                              {message.role === "user" && (
                                <button
                                  type="button"
                                  className="ml-2 text-gray-400 hover:text-blue-500"
                                  onClick={() => handleEditMessage(message.id, message.content)}
                                  title="Edit message"
                                >
                                  ✏️
                                </button>
                              )}
                              {Array.isArray((message as { editHistory?: EditHistory[] }).editHistory) && ((message as { editHistory?: EditHistory[] }).editHistory?.length ?? 0) > 0 && (
                                <button
                                  type="button"
                                  className="ml-2 text-xs text-gray-400 underline"
                                  onClick={() => setShowHistoryFor(message.id)}
                                >
                                  View Edit History
                                </button>
                              )}
                              {showHistoryFor === message.id && Array.isArray((message as { editHistory?: EditHistory[] }).editHistory) && (
                                <div className="bg-gray-100 p-2 rounded mt-1 text-xs">
                                  {((message as { editHistory?: EditHistory[] }).editHistory ?? []).map((edit, idx) => (
                                    <div key={`${edit.editedAt}-${idx}`}>
                                      <span>{new Date(edit.editedAt).toLocaleString()}:</span> {edit.content}
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    className="mt-1 text-xs text-blue-500 underline"
                                    onClick={() => setShowHistoryFor(null)}
                                  >
                                    Close
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                          {message.role === "assistant" && message.content === "" && (
                            <div className="flex space-x-1 h-6 items-center">
                              <div
                                className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              />
                              <div
                                className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              />
                              <div
                                className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              />
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
      {toast && (
        <button
          type="button"
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
          onClick={() => setToast(null)}
        >
          {toast.message}
        </button>
      )}
      {/* Confirmation dialog for delete (rendered once) */}
      {showDeleteId && (() => {
        const conv = conversations.find(c => (c.id || c._id) === showDeleteId)
        if (!conv) return null
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
              <p className="mb-2">Are you sure you want to delete this conversation?</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => confirmDeleteConversation((conv.id || conv._id || "") as string)}
                >Delete</button>
                <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={() => setShowDeleteId(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

function SuggestionButton({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <motion.button
      type="button"
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
