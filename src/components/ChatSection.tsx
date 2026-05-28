import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, ArrowLeft, Trash2, ShieldCheck, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

interface ChatSectionProps {
  onBack: () => void;
}

export default function ChatSection({ onBack }: ChatSectionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      role: "model",
      text: "नमस्कार! मी 'ग्राम-मित्र' (Gram-Mitra) एआय आहे, ग्रुप ग्रामपंचायत केर-भेकुर्ली (दौडामार्ग, सिंधुदुर्ग) चा अधिकृत डिजिटल सहाय्यक. \n\nमी तुम्हाला पंचायत सेवा, दाखले व शासकीय योजना (उदा. मुख्यमंत्री माझी लाडकी बहीण योजना, घरकुल योजना) याबाबत अचूक माहिती सोप्या मराठीत देऊ शकतो. \n\nतुम्हाला काय विचारायचे आहे?",
      timestamp: new Date().toLocaleTimeString("mr-IN", { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Pre-seed chips representing Image 11
  const promptChips = [
    "लाडकी बहीण योजना माहिती",
    "रहिवासी दाखला कसा मिळेल?",
    "ग्रामसभा कधी आहे?"
  ];

  // Scroll to bottom every time messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `m-usr-${Math.random()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("mr-IN", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);

    try {
      // Package conversation index history
      // Keep only text & role elements for Express route
      const historyToSend = [...messages, userMsg].map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        content: msg.text
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyToSend })
      });
      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: `m-bot-${Math.random()}`,
        role: "model",
        text: data.text || "क्षमस्व, मी समजलो नाही. कृपया पुन्हा विचारा.",
        timestamp: new Date().toLocaleTimeString("mr-IN", { hour: "2-digit", minute: "2-digit" })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      const errorMsg: ChatMessage = {
        id: `m-err-${Math.random()}`,
        role: "model",
        text: "कनेक्शन अयशस्वी झाले. कृपया एआय स्टुडिओमध्ये 'GEMINI_API_KEY' जोडलेली असल्याची किंवा इंटरनेट चालू असल्याची खात्री करा.",
        timestamp: new Date().toLocaleTimeString("mr-IN", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm("गप्पा इतिहास साफ करायचा का?")) {
      setMessages([
        {
          id: "init-2",
          role: "model",
          text: "पुन्हा एकदा नमस्कार! मी 'ग्राम-मित्र' सहाय्यासाठी तयार आहे. सरकारी योजना किंवा दाखल्यांबद्दल विचारा.",
          timestamp: new Date().toLocaleTimeString("mr-IN", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-[#121212] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl animate-fade-in text-white" id="chat-section-container">
      
      {/* Chat header area with back arrow */}
      <div className="bg-[#0D0D0D] border-b border-[#262626] p-4 flex items-center justify-between" id="chat-sub-header">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="hover:bg-white/5 p-2 rounded-xl text-white transition-all border border-transparent hover:border-white/10 cursor-pointer"
            title="मागे जा"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="font-extrabold text-xs md:text-sm font-display flex items-center gap-1.5 uppercase tracking-wide">
              ग्राम-मित्र (Gram-Mitra AI)
              <ShieldCheck className="w-4 h-4 text-[#FF5200]" />
            </h3>
            <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase block">केर-भेकुर्ली ग्रामपंचायत एआय मदतनीस</span>
          </div>
        </div>

        <button 
          onClick={handleClearChat}
          className="hover:bg-white/5 p-2 rounded-xl text-white/45 hover:text-red-400 border border-transparent hover:border-red-500/10 transition-all cursor-pointer"
          title="इतिहास साफ करा"
        >
          <Trash2 className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Message List Panel */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#121212]" id="chat-messages-container">
        {messages.map((msg) => {
          const isBot = msg.role === "model";
          return (
            <div 
              key={msg.id} 
              className={`flex flex-col max-w-[85%] ${isBot ? "self-start items-start" : "self-end items-end ml-auto"}`}
              id={`chat-bubble-${msg.id}`}
            >
              {/* Sender indicator */}
              <span className="text-[9px] font-mono font-bold tracking-wider text-white/30 mb-1 uppercase">
                {isBot ? "🤖 ग्राम-मित्र एआय" : "👤 रहिवासी (Resident)"}
              </span>

              {/* Text cloud bubble */}
              <div className={`p-4 rounded-2xl text-xs md:text-sm whitespace-pre-line leading-relaxed shadow-sm ${
                isBot 
                  ? "bg-[#1C1C1F] border border-[#262626] text-white rounded-tl-none font-sans" 
                  : "bg-[#FF5200] text-white rounded-tr-none font-sans font-bold"
              }`}>
                {msg.text}
              </div>

              {/* Timestamp */}
              <span className="text-[8px] font-mono text-white/20 mt-1 block tracking-wider">{msg.timestamp}</span>
            </div>
          );
        })}

        {/* Typing loading indicators */}
        {loading && (
          <div className="flex flex-col items-start max-w-[80%] self-start" id="chat-typing-loader">
            <span className="text-[9px] font-mono font-bold text-white/30 mb-1">🤖 ग्राम-मित्र विचार करत आहे...</span>
            <div className="bg-[#1C1C1F] border border-[#262626] p-4 rounded-2xl rounded-tl-none shadow-md flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#FF5200] animate-spin" />
              <span className="text-xs text-white/50 font-sans">एआय उत्तर शोधत आहे...</span>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Prompt quick suggestions Chips */}
      {messages.length <= 2 && !loading && (
        <div className="px-4 py-3 bg-[#0D0D0D] border-t border-[#262626] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2" id="prompt-chips-container">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="bg-[#121212] hover:bg-[#1C1C1F] hover:text-white transition-all border border-[#262626] text-white/75 text-[10px] uppercase tracking-wider rounded-xl px-4 py-2 font-extrabold inline-block cursor-pointer"
            >
              🔍 "{chip}"
            </button>
          ))}
        </div>
      )}

      {/* Form Input submit panel */}
      <div className="p-3 bg-[#0D0D0D] border-t border-[#262626] flex gap-2" id="chat-textbox-area">
        <input 
          type="text"
          placeholder="मराठीत किंवा इंग्रजीत प्रश्न विचारा..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage(inputVal);
          }}
          className="flex-1 bg-[#1C1C1F] border border-[#262626] rounded-xl px-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5200] text-white placeholder:text-white/20"
        />
        <button 
          onClick={() => handleSendMessage(inputVal)}
          disabled={!inputVal.trim() || loading}
          className="p-3 bg-white hover:bg-neutral-100 disabled:bg-[#1C1C1F] disabled:text-white/20 text-black rounded-xl shadow-lg transition-all flex items-center justify-center cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
