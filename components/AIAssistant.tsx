"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Send, Sparkles, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hello. I am your AI Stylist. How can I assist with your fashion questions today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json();
      
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: data.response 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <div className="p-8 md:p-12 flex flex-col justify-center bg-velora-charcoal text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-velora-wine/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium tracking-wide w-fit mb-6 border border-white/20">
              <Sparkles size={12} className="text-velora-gold" />
              AI STYLIST BETA
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              Your Personal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-velora-gold to-white">Fashion Intelligence</span>
            </h2>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Experience the future of personal shopping. Our AI understands your taste, 
              suggests outfits, and answers your toughest style questions instantly.
            </p>
            <ul className="space-y-4 mb-8">
              {['Instant styling advice', 'Fabric care guides', 'Trend analysis'].map((item, i) => (
                <li key={i} className="flex items-center text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 bg-velora-gold rounded-full mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 flex flex-col h-[600px] lg:h-auto border-l border-gray-100">
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-velora-charcoal flex items-center justify-center text-white">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">AI Stylist</h3>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Online
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-4 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                    msg.role === 'user' ? "bg-gray-200 text-gray-600" : "bg-velora-charcoal text-white"
                  )}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-velora-black text-white rounded-tr-none" 
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-velora-charcoal flex items-center justify-center flex-shrink-0 text-white">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
              </motion.div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about trends, styling, or fabrics..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-velora-black focus:ring-1 focus:ring-velora-black transition-all text-sm"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center bg-velora-black hover:bg-gray-800"
              >
                <Send size={18} className={isLoading ? "opacity-0" : ""} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
