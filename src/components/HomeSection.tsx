import React, { useState } from "react";
import { ArrowRight, Sun, FileText, Landmark, ShieldCheck, Heart, Megaphone, CheckCircle2, AlertCircle, HelpCircle, CornerDownRight, MessageSquareCode } from "lucide-react";
import { newsData } from "../data";

interface HomeSectionProps {
  onNavigate: (tabId: string) => void;
  onOpenChat: () => void;
  onOpenGrievance: () => void;
}

export default function HomeSection({ onNavigate, onOpenChat, onOpenGrievance }: HomeSectionProps) {
  const [activeNewsTab, setActiveNewsTab] = useState<"sindhudurg" | "maharashtra" | "bharat">("sindhudurg");
  const [trackInput, setTrackInput] = useState("");
  const [trackResult, setTrackResult] = useState<any>(null);
  const [trackError, setTrackError] = useState("");

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;

    setTrackError("");
    setTrackResult(null);

    try {
      const res = await fetch("/api/services/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingId: trackInput })
      });
      const data = await res.json();
      if (data.success) {
        setTrackResult(data.record);
      } else {
        setTrackError(data.error || "अर्ज सापडला नाही.");
      }
    } catch (err) {
      setTrackError("सर्व्हर एरर. कृपया पुन्हा प्रयत्न करा.");
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in text-white" id="home-section">
      {/* 1. Welcoming Title */}
      <div className="bg-[#121212] p-5 rounded-2xl border-l-[3px] border-[#FF5200] border border-[#262626]">
        <h2 className="text-xl md:text-2xl font-black font-display text-white flex items-center gap-2 uppercase tracking-tight">
          सप्रेम नमस्कार, स्नेहल! 
          <span className="animate-bounce">👋</span>
        </h2>
        <p className="text-xs md:text-sm text-white/60 font-sans mt-2">
          तुमच्या डिजिटल ग्रामपंचायतीमध्ये आपले मनःपूर्वक स्वागत आहे. खालील रकाना वापरून विविध सेवा आणि सुविधांचे विहंगावलोकन करा.
        </p>
      </div>

      {/* 2. Weather & Notices scroll */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="tickers">
        {/* Weather */}
        <div className="bg-[#121212] border border-[#262626] rounded-xl p-3.5 flex items-center justify-between text-white shadow-sm" id="weather-ticker">
          <span className="flex items-center gap-2.5 text-xs font-semibold">
            <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
            <span className="font-mono uppercase tracking-wider text-white/90">दोडामार्ग हवामान: <span className="text-[#FFD600]">२८°C</span> • अंशतः ढगाळ</span>
          </span>
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#FF5200] bg-[#FF5200]/10 border border-[#FF5200]/30 px-2 py-0.5 rounded uppercase">मऊ</span>
        </div>

        {/* Notices scrolling highlight */}
        <div className="bg-[#121212] border border-red-500/20 rounded-xl p-3.5 text-white shadow-sm flex items-center overflow-hidden" id="notices-ticker">
          <Megaphone className="w-5 h-5 text-red-500 mr-2.5 flex-shrink-0 animate-pulse" />
          <div className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full">
            <span className="bg-red-600 text-white text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-xs mr-2 inline-block">ALERT</span>
            महत्त्वाची सूचना: उद्या सकाळी ठीक १०:०० वाजता विशेष ग्रामसभा बैठक आयोजित. उपस्थिती अनिवार्य आहे!
          </div>
        </div>
      </div>

      {/* 3. Core Quick Action Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="quick-actions-cards">
        {/* Interactive Govt Schemes card */}
        <div 
          onClick={() => onNavigate("schemes")}
          className="bg-[#121212] hover:bg-[#1C1C1F] border border-[#262626] rounded-2xl p-5 shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5200] group-hover:scale-110 transition-transform">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold font-display text-white mt-4 uppercase tracking-tight">सरकारी योजना</h3>
            <p className="text-[11px] text-white/50 mt-2 line-clamp-2 leading-relaxed">
              विविध केंद्र आणि राज्य सरकारच्या लोककल्याणकारी योजनांची सविस्तर माहिती आणि अर्ज प्रक्रिया.
            </p>
          </div>
          <div className="flex items-center text-[#FF5200] text-xs font-black uppercase tracking-wider mt-4 group-hover:translate-x-1.5 transition-transform font-mono">
            सर्व योजना पाहा <ArrowRight className="w-4 h-4 ml-1.5" />
          </div>
        </div>

        {/* Categories Grid (2x2 style inline for visual balance) */}
        <div className="grid grid-cols-2 gap-3 md:col-span-2" id="grid-departments">
          {/* Civil Services */}
          <div 
            onClick={() => onNavigate("services")}
            className="bg-[#121212] border border-[#262626] hover:bg-[#1C1C1F] rounded-2xl p-4 flex flex-col justify-between cursor-pointer group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <h4 className="text-xs font-black uppercase tracking-wider font-display text-white">नागरी सेवा</h4>
              <p className="text-[10px] text-white/45 mt-1">दाखले आणि परवाने ऑनलाईन अर्ज</p>
            </div>
          </div>

          {/* Taxes Payment */}
          <div 
            onClick={() => onNavigate("services")}
            className="bg-[#121212] border border-[#262626] hover:bg-[#1C1C1F] rounded-2xl p-4 flex flex-col justify-between cursor-pointer group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[#FFD600] flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <h4 className="text-xs font-black uppercase tracking-wider font-display text-white">करांचा भरणा</h4>
              <p className="text-[10px] text-white/45 mt-1">घरपट्टी, पाणीपट्टी आणि इतर कर</p>
            </div>
          </div>

          {/* Education Dept */}
          <div 
            onClick={() => onNavigate("services")}
            className="bg-[#121212] border border-[#262626] hover:bg-[#1C1C1F] rounded-2xl p-4 flex flex-col justify-between cursor-pointer group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <h4 className="text-xs font-black uppercase tracking-wider font-display text-white">शिक्षण विभाग</h4>
              <p className="text-[10px] text-white/45 mt-1">शाळा आणि शिष्यवृत्ती योजना</p>
            </div>
          </div>

          {/* Agri Dept */}
          <div 
            onClick={() => onNavigate("schemes")}
            className="bg-[#121212] border border-[#262626] hover:bg-[#1C1C1F] rounded-2xl p-4 flex flex-col justify-between cursor-pointer group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <h4 className="text-xs font-black uppercase tracking-wider font-display text-white">कृषी विभाग</h4>
              <p className="text-[10px] text-white/45 mt-1">शेतकरी योजना व खतांची उपलब्धता</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Village Development Banner ("जल जीवन मिशन") */}
      <div className="relative overflow-hidden rounded-2xl border border-[#262626]" id="development-showcase">
        <div className="h-48 md:h-60 relative bg-[#090909]">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800" 
            alt="जल जीवन मिशन" 
            className="w-full h-full object-cover opacity-50 object-center grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-transparent" />
          <div className="absolute top-3 left-3 bg-[#FF5200] text-white text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-sm shadow-xl font-mono">
            यशस्वी प्रकल्प ★★★
          </div>
        </div>
        <div className="p-5 bg-[#121212] border-t border-[#262626]">
          <h3 className="text-lg md:text-xl font-black font-display tracking-tight text-white uppercase">
            जल जीवन मिशन: १००% नळ जोडणी पूर्ण!
          </h3>
          <p className="text-xs text-white/60 mt-3 leading-relaxed font-sans">
            केर-भेकुर्ली गावातील प्रत्येक घराला आता शुद्ध पिण्याचे पाणी नळाद्वारे चोवीस तास विनामूल्य उपलब्ध करून देण्यात आले आहे. दोडामार्ग तालुक्यातील हे पहिले १००% स्वयंपूर्ण आणि जल-समृद्ध गाव ठरले आहे.
          </p>
        </div>
      </div>

      {/* 5. Gram-Mitra AI Chat Launcher Box */}
      <div 
        onClick={onOpenChat}
        className="bg-[#0D0D0D] border-2 border-[#FF5200] hover:bg-[#121212] text-white rounded-2xl p-5 flex items-center justify-between shadow-2xl cursor-pointer transition-all duration-300 transform group"
        id="chat-promo-banner"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FF5200]/10 border border-[#FF5200]/30 flex items-center justify-center text-[#FF5200]">
            <MessageSquareCode className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-base md:text-lg font-display uppercase tracking-tight">ग्राम-मित्र (AI Helper)</h4>
              <span className="bg-[#FF5200] text-white text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
            </div>
            <p className="text-xs text-white/50 mt-1 leading-relaxed">
              गावच्या सरकारी योजना, प्रमाणपत्रे व माहितीसाठी येथे थेट मराठीत गप्पा मारा!
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:translate-x-1.5 transition-transform shrink-0">
          <ArrowRight className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* 6. Active Application Status Lookup / Tracker Form */}
      <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 shadow-sm" id="status-tracker-container">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] font-mono">अर्जाची थेट स्थिती तपासा</h3>
        
        <form onSubmit={handleTrackSubmit} className="mt-4 flex gap-2">
          <input 
            type="text" 
            placeholder="उदा. KB908 किंवा KB844..." 
            value={trackInput}
            onChange={(e) => setTrackInput(e.target.value)}
            className="flex-1 bg-[#1C1C1F] border border-[#262626] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF5200] text-white font-mono placeholder:text-white/20"
          />
          <button 
            type="submit" 
            className="bg-white hover:bg-white/95 text-black px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
          >
            तपासा
          </button>
        </form>

        {trackError && <p className="text-red-500 text-xs mt-2 font-mono">{trackError}</p>}

        {trackResult && (
          <div className="mt-4 bg-[#1C1C1F] border border-[#FF5200]/20 rounded-xl p-4.5 animate-slide-up">
            <div className="flex justify-between items-start">
              <div>
                <strong className="text-sm text-white block">{trackResult.name}</strong>
                <span className="text-[11px] text-white/50 block mt-1">अर्जदार: {trackResult.applicant} • <span className="font-mono">{trackResult.date}</span></span>
              </div>
              <span className={`text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-sm font-black shadow-sm ${
                trackResult.status === "पूर्ण" 
                  ? "bg-green-500/10 text-green-400 border border-green-500/30" 
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
              }`}>
                {trackResult.status}
              </span>
            </div>
          </div>
        )}

        {/* Demo status rows shown in UI preview */}
        <div className="mt-4 border-t border-[#262626] pt-4.5 space-y-2" id="demo-status-rows">
          <div className="flex justify-between items-center bg-[#1C1C1F] border border-[#262626] p-3 rounded-xl text-xs" id="status-row-1">
            <span className="flex items-center gap-2">
              <CornerDownRight className="w-3.5 h-3.5 text-[#FF5200]" />
              <strong>रहिवासी दाखला</strong> <span className="font-mono text-white/40">(#KB908)</span>
            </span>
            <span className="bg-[#FFD600]/10 text-[#FFD600] border border-[#FFD600]/20 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono">Pending</span>
          </div>
          <div className="flex justify-between items-center bg-[#1C1C1F] border border-[#262626] p-3 rounded-xl text-xs" id="status-row-2">
            <span className="flex items-center gap-2">
              <CornerDownRight className="w-3.5 h-3.5 text-[#FF5200]" />
              <strong>जन्म नोंदणी दाखला</strong> <span className="font-mono text-white/40">(#KB844)</span>
            </span>
            <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono font-bold">Completed</span>
          </div>
        </div>
      </div>

      {/* 7. Latest News / ताजी बातमी */}
      <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 shadow-sm" id="news-section">
        <div className="flex justify-between items-center pb-3 border-b border-[#262626]">
          <h3 className="text-md font-extrabold font-display text-white uppercase tracking-tight">ताजी बातमी (Latest News)</h3>
          <span className="text-[10px] font-mono tracking-widest text-[#FF5200] font-black uppercase">सिंधुदुर्ग</span>
        </div>

        <div className="flex gap-2 mt-4 mb-4 border-b border-[#262626] pb-3" id="news-category-filters">
          <button 
            onClick={() => setActiveNewsTab("sindhudurg")}
            className={`text-[10px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full font-black transition-colors ${
              activeNewsTab === "sindhudurg" ? "bg-white text-black" : "bg-[#1C1C1F] border border-[#262626] text-white/60 hover:text-white"
            }`}
          >
            सिंधुदुर्ग
          </button>
          <button 
            onClick={() => setActiveNewsTab("maharashtra")}
            className={`text-[10px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full font-black transition-colors ${
              activeNewsTab === "maharashtra" ? "bg-white text-black" : "bg-[#1C1C1F] border border-[#262626] text-white/60 hover:text-white"
            }`}
          >
            महाराष्ट्र
          </button>
          <button 
            onClick={() => setActiveNewsTab("bharat")}
            className={`text-[10px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full font-black transition-colors ${
              activeNewsTab === "bharat" ? "bg-white text-black" : "bg-[#1C1C1F] border border-[#262626] text-white/60 hover:text-white animate-pulse"
            }`}
          >
            भारत
          </button>
        </div>

        <div className="space-y-4" id="news-list">
          {activeNewsTab === "sindhudurg" ? (
            newsData.map((item) => (
              <div key={item.id} className="group border-b border-white/5 last:border-0 pb-3 last:pb-0" id={`news-item-${item.id}`}>
                <h4 className="text-xs md:text-sm font-bold text-white group-hover:text-[#FF5200] transition-colors leading-relaxed">
                  {item.title}
                </h4>
                <div className="flex gap-3 text-[10px] text-white/30 mt-1.5 font-mono uppercase tracking-wider">
                  <span>{item.source}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-white/40 font-mono uppercase tracking-wide" id="news-fallback-empty">
              नवीन स्थानिक बातम्या लोड होत आहेत...
            </div>
          )}
        </div>
      </div>

      {/* 8. Important Links / महत्त्वाच्या लिंक्स */}
      <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 shadow-sm" id="important-links-container">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-4 font-mono">महत्त्वाच्या माहितीपूर्ण लिंक्स</h3>
        <div className="grid grid-cols-3 gap-3" id="links-grid">
          <a 
            href="https://www.maharashtra.gov.in" 
            target="_blank" 
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1C1C1F] border border-[#262626] hover:bg-[#262626] transition-colors text-center group"
          >
            <div className="w-8 h-8 rounded-full bg-[#FF5200]/10 border border-[#FF5200]/30 flex items-center justify-center font-black text-xs text-[#FF5200] shadow-sm">म</div>
            <span className="text-[10px] font-bold text-white/70 mt-2 group-hover:text-white transition-colors leading-tight">महाराष्ट्र शासन</span>
          </a>
          <a 
            href="https://www.india.gov.in" 
            target="_blank" 
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1C1C1F] border border-[#262626] hover:bg-[#262626] transition-colors text-center group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center font-black text-xs text-blue-400 shadow-sm">भा</div>
            <span className="text-[10px] font-bold text-white/70 mt-2 group-hover:text-white transition-colors leading-tight">भारत सरकार</span>
          </a>
          <a 
            href="https://sindhudurg.gov.in" 
            target="_blank" 
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1C1C1F] border border-[#262626] hover:bg-[#262626] transition-colors text-center group"
          >
            <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center font-black text-xs text-purple-400 shadow-sm">सिं</div>
            <span className="text-[10px] font-bold text-white/70 mt-2 group-hover:text-white transition-colors leading-tight">सिंधुदुर्ग जिल्हा</span>
          </a>
        </div>
      </div>

      {/* 9. Feedback Card / तक्रार निवारण Launcher */}
      <div className="bg-[#121212] border-l-[3px] border-[#FF5200] border border-[#262626] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5" id="feedback-promo">
        <div className="text-center md:text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FF5200]/10 border border-[#FF5200]/30 hidden md:flex items-center justify-center text-[#FF5200] shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-md font-extrabold font-display text-white uppercase tracking-tight">मदत हवी आहे किंवा तक्रार आहे?</h4>
            <p className="text-xs text-white/60 mt-1 max-w-lg leading-relaxed">
              गावातील नागरी समस्या, पाणी पुरवठा किंवा दिवाबत्ती संदर्भात काही आक्षेप असल्यास किंवा तक्रार नोंदवायची असल्यास येथे कळवावे.
            </p>
          </div>
        </div>
        <button 
          onClick={onOpenGrievance}
          className="bg-white hover:bg-neutral-100 text-black text-xs font-black uppercase tracking-wider px-5 py-3 rounded-lg shadow-xl shrink-0 transition-transform transform active:scale-95 cursor-pointer"
        >
          तक्रार नोंदवा ✍️
        </button>
      </div>

    </div>
  );
}
