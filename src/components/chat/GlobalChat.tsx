"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Shield, Zap, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function GlobalChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, user: "MironBot", text: "ExA Arena'ya Hoş Geldin! 🚀", role: "ADMIN" },
        { id: 2, user: "Namık Kemal", text: "Beyler Valorant turnuvası ne zaman?", role: "USER" },
        { id: 3, user: "Asker07", text: "Az sonra başlıyor, ben hazırım.", role: "USER" },
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages([...messages, { id: Date.now(), user: "Siz", text: input, role: "USER" }]);
        setInput("");
    };

    return (
        <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-6">
            {isOpen && (
                <div className="w-[400px] h-[600px] bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-[48px] shadow-3xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-500">
                    {/* Header */}
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm font-black italic uppercase text-white leading-none">Global Chat</h3>
                                <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest mt-1">2,482 OYUNCU ÇEVRİMİÇİ</span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-zinc-600 hover:text-white transition-all">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 scrollbar-hide">
                        {messages.map((msg) => (
                            <div key={msg.id} className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${msg.role === 'ADMIN' ? 'text-blue-500' : 'text-zinc-500'}`}>
                                        {msg.user}
                                    </span>
                                    {msg.role === 'ADMIN' && <Shield className="w-3 h-3 text-blue-500" />}
                                </div>
                                <div className="max-w-[85%] bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none">
                                    <p className="text-xs font-bold text-zinc-300 leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-8 bg-zinc-950/50 border-t border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Mesajınızı yazın..."
                                    className="h-14 px-6 bg-white/[0.03] border-white/5 rounded-2xl text-[10px] font-bold focus:border-blue-500"
                                />
                                <Smile className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 hover:text-blue-500 cursor-pointer" />
                            </div>
                            <Button type="submit" className="w-14 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl active:scale-95 transition-all">
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-20 h-20 rounded-[32px] bg-blue-600 hover:bg-blue-700 text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] flex items-center justify-center transition-all active:scale-90 group relative grayscale-[0.5] hover:grayscale-0"
            >
                <div className="absolute inset-0 bg-blue-400 rounded-[32px] animate-ping opacity-20 group-hover:block hidden" />
                <MessageSquare className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-lg border-4 border-zinc-950 flex items-center justify-center">
                    <span className="text-[8px] font-black">3</span>
                </div>
            </button>
        </div>
    );
}
