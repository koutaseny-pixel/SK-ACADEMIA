"use client";


import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{id: string, role: string, content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput("");
    
    const userMessage = { id: Date.now().toString(), role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let botMessage = { id: (Date.now() + 1).toString(), role: "assistant", content: "" };
      setMessages((prev) => [...prev, botMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        botMessage.content += chunk;
        setMessages((prev) => [...prev.slice(0, -1), { ...botMessage }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
              style={{ height: "550px", maxHeight: "80vh" }}
            >
              {/* Header */}
              <div className="bg-[#1b508f] p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles size={20} className="text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">Seny</h3>
                    <p className="text-xs text-blue-200 font-medium">Assistant Virtuel SK ACADEMIA</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 my-8">
                    <div className="w-16 h-16 bg-blue-100 text-[#1b508f] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles size={32} />
                    </div>
                    <p className="font-medium">Bonjour ! Je suis Seny.</p>
                    <p className="text-sm mt-1">Comment puis-je vous aider avec vos préparations aux concours ou nos fascicules aujourd&apos;hui ?</p>
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role !== "user" && (
                      <div className="w-8 h-8 rounded-full bg-[#1b508f] shrink-0 flex items-center justify-center text-white mt-1 shadow-sm">
                        <Bot size={16} />
                      </div>
                    )}
                    <div
                      className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm shadow-sm ${
                        message.role === "user"
                          ? "bg-orange-500 text-white rounded-br-sm"
                          : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm leading-relaxed"
                      }`}
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-[#1b508f] shrink-0 flex items-center justify-center text-white shadow-sm">
                      <Bot size={16} />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-white border border-gray-100 text-gray-500 rounded-bl-sm flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-[#1b508f]" />
                      <span className="text-xs font-medium">Seny réfléchit...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-gray-100">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full pr-2 pl-4 py-1"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez votre question..."
                    className="flex-1 bg-transparent py-2 outline-none text-sm text-gray-900 placeholder:text-gray-400"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="w-10 h-10 bg-[#1b508f] text-white rounded-full flex items-center justify-center shrink-0 hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:hover:bg-[#1b508f]"
                  >
                    <Send size={16} className="ml-1" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-[#1b508f] hover:bg-blue-800 text-white rounded-full flex items-center justify-center shadow-xl shadow-[#1b508f]/30 hover:-translate-y-1 transition-all group"
          >
            <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>
    </>
  );
}
