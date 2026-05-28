import React, { useState } from "react";
import { 
  Home, 
  Layers, 
  FileText, 
  Megaphone, 
  Image as ImageIcon, 
  MessageSquare, 
  Bell, 
  User, 
  Menu, 
  X, 
  Search, 
  MapPin, 
  Sun,
  ShieldCheck,
  Facebook,
  Twitter,
  Calendar
} from "lucide-react";

import HomeSection from "./components/HomeSection";
import SchemesSection from "./components/SchemesSection";
import ServicesSection from "./components/ServicesSection";
import NoticesSection from "./components/NoticesSection";
import GallerySection from "./components/GallerySection";
import ChatSection from "./components/ChatSection";
import EmblemLogo from "./components/EmblemLogo";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "उद्या सकाळी ठीक १०:०० वाजता विशेष ग्रामसभा", unread: true },
    { id: 2, text: "डिसेंबर ग्रामपंचायत पाणीपट्टी संकलन केंद्र सुरू", unread: false }
  ]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col font-sans selection:bg-[#FF5200] selection:text-white text-white" id="gram-app-root">
      
      {/* 1. STATE & GOVERNMENT LOGO HEADER ACCENT (OFFICIAL STARK ENERGY) */}
      <div className="bg-[#0D0D0D] text-white/50 px-4 py-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] border-b border-[#262626] z-30" id="official-state-accent">
        <span className="flex items-center gap-2">
          <span className="bg-[#FF5200] text-white px-2 py-0.5 rounded-xs text-[9px] font-black tracking-widest leading-none">महाराष्ट्र</span>
          ग्रुप ग्रामपंचायत केर-भेकुर्ली, ता. दोडामार्ग, जि. सिंधुदुर्ग • डिजिटल नागरिक पोर्टल
        </span>
        <span className="hidden md:inline-flex items-center gap-2 text-white/30 text-[9px]">
          <span>सांघिक ऐक्य व अभिमानातुन आदर्शगाव 🌟</span>
        </span>
      </div>

      {/* 2. MAIN APP COMPLIANT HEADER */}
      <header className="bg-[#121212]/95 backdrop-blur-md border-b border-[#262626] sticky top-0 z-40 shadow-xl" id="main-portal-header">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          
          {/* Logo Brand Combo matching Images */}
          <div className="flex items-center gap-3 select-none">
            <EmblemLogo size={46} />
            <div>
              <h1 className="text-base md:text-xl font-black font-display tracking-tighter text-white leading-tight flex items-center gap-1.5 uppercase">
                ग्राम-सहयोग <span className="text-[9px] tracking-widest bg-[#FF5200] text-white px-2 py-0.5 rounded-xs font-black">DIGITAL</span>
              </h1>
              <p className="text-[9px] md:text-[10px] text-white/40 font-mono tracking-wider uppercase leading-none mt-1">
                केर-भेकुर्ली ग्रामपंचायत • Ker-Bhekurli Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation Row */}
          <nav className="hidden lg:flex items-center gap-1.5 font-display" id="desktop-headers">
            <button 
              onClick={() => handleNavigate("home")}
              className={`px-3.5 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "home" ? "bg-white text-black shadow-lg font-black scale-102" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Home className="w-4 h-4" />
              मुख्यपृष्ठ
            </button>
            <button 
              onClick={() => handleNavigate("schemes")}
              className={`px-3.5 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "schemes" ? "bg-white text-black shadow-lg font-black scale-102" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4" />
              सरकारी योजना
            </button>
            <button 
              onClick={() => handleNavigate("services")}
              className={`px-3.5 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "services" ? "bg-white text-black shadow-lg font-black scale-102" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <FileText className="w-4 h-4" />
              नागरी सेवा
            </button>
            <button 
              onClick={() => handleNavigate("notices")}
              className={`px-3.5 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "notices" ? "bg-white text-black shadow-lg font-black scale-102" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Megaphone className="w-4 h-4" />
              सूचना व तक्रार
            </button>
            <button 
              onClick={() => handleNavigate("gallery")}
              className={`px-3.5 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "gallery" ? "bg-white text-black shadow-lg font-black scale-102" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              ग्राम दालन
            </button>
            <button 
              onClick={() => handleNavigate("chat")}
              className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "chat"
                  ? "bg-[#FF5200] text-white shadow-lg font-black scale-102"
                  : "bg-white/10 hover:bg-white/15 text-white shadow-sm"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-white/90 fill-white/10 animate-pulse" />
              एआय ग्राम-मित्र
            </button>
          </nav>

          {/* Right Accoutrements (Notification Bell + Profile Card trigger) */}
          <div className="flex items-center gap-2">
            
            {/* Notification Bell */}
            <div className="relative" id="notifications-tray-wrapper">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 bg-[#1C1C1F] hover:bg-[#262626] border border-[#262626] rounded-xl text-white/80 hover:text-white relative transition-transform active:scale-95"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF5200] rounded-full border-2 border-[#1C1C1F] animate-pulse" id="unread-dot" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#121212] border border-[#262626] rounded-xl shadow-2xl z-50 p-4 animate-scale-up border-white/5" id="notifications-dropdown">
                  <div className="flex justify-between items-center pb-2 border-b border-[#262626] mb-2">
                    <strong className="text-[10px] font-mono uppercase tracking-widest text-white/50">ग्रामअधिकारी घोषणा</strong>
                    <button onClick={markAllRead} className="text-[10px] text-[#FF5200] font-black uppercase tracking-wider hover:underline">सर्व वाचा</button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2 rounded text-xs leading-relaxed ${n.unread ? "bg-[#1A1A1A] border-l-2 border-[#FF5200] text-white" : "bg-[#0A0A0A] text-white/60"}`}>
                        <span className="block">{n.text}</span>
                        {n.unread && <span className="text-[9px] text-[#FF5200] font-mono font-bold uppercase tracking-wider block mt-1">नवीन अपडेट</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Micro Weather/State text displayed in headbar */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#1C1C1F] border border-[#262626] rounded-full px-3.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white/60">
              <MapPin className="w-3.5 h-3.5 text-[#FF5200]" />
              <span>सिंधुदुर्ग</span>
            </div>

            {/* Mobile Sidebar Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-neutral-800 rounded-lg border border-[#262626]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* 3. MOBILE SYSTEM DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end" id="mobile-drawer">
          <div className="w-72 bg-[#121212] h-full shadow-2xl p-6 flex flex-col justify-between animate-slide-left border-l border-[#262626]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#262626] mb-6">
                <span className="font-extrabold uppercase text-white font-display text-xs tracking-[0.2em]">ग्राम-सहयोग वर्ग</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 font-display">
                <button 
                  onClick={() => handleNavigate("home")}
                  className={`w-full text-left p-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-3 transition-colors ${
                    activeTab === "home" ? "bg-white text-black font-black" : "hover:bg-white/5 text-white/70"
                  }`}
                >
                  <Home className="w-4.5 h-4.5" /> मुख्यपृष्ठ (Dashboard)
                </button>
                <button 
                  onClick={() => handleNavigate("schemes")}
                  className={`w-full text-left p-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-3 transition-colors ${
                    activeTab === "schemes" ? "bg-white text-black font-black" : "hover:bg-white/5 text-white/70"
                  }`}
                >
                  <Layers className="w-4.5 h-4.5" /> सरकारी योजना (Govt Schemes)
                </button>
                <button 
                  onClick={() => handleNavigate("services")}
                  className={`w-full text-left p-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-3 transition-colors ${
                    activeTab === "services" ? "bg-white text-black font-black" : "hover:bg-white/5 text-white/70"
                  }`}
                >
                  <FileText className="w-4.5 h-4.5" /> डिजिटल नागरी सेवा (Services)
                </button>
                <button 
                  onClick={() => handleNavigate("notices")}
                  className={`w-full text-left p-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-3 transition-colors ${
                    activeTab === "notices" ? "bg-white text-black font-black" : "hover:bg-white/5 text-white/70"
                  }`}
                >
                  <Megaphone className="w-4.5 h-4.5" /> सूचना / तक्रार निवारण (Grievance)
                </button>
                <button 
                  onClick={() => handleNavigate("gallery")}
                  className={`w-full text-left p-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-3 transition-colors ${
                    activeTab === "gallery" ? "bg-white text-black font-black" : "hover:bg-white/5 text-white/70"
                  }`}
                >
                  <ImageIcon className="w-4.5 h-4.5" /> ग्राम दालन (Village Gallery)
                </button>
                <button 
                  onClick={() => handleNavigate("chat")}
                  className="w-full text-left p-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-3 bg-[#FF5200] text-white hover:bg-opacity-90"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-white fill-white/20" /> ग्राम-मित्र (AI Chatbot)
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262626] flex items-center gap-3 text-xs text-white/60">
              <User className="w-4.5 h-4.5 text-[#FF5200]" />
              <div>
                <strong className="block text-white font-sans">स्नेहल सावंत</strong>
                <span className="font-mono text-[9px] uppercase tracking-wider">प्रभाग क्र. २ रहिवासी</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN LAYOUT WRAPPER (TWO-SIDED SCREEN FOR LARGER DESKTOPS AND SINGLE TIGHT COMPLETED VIEWS FOR PHONES) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6" id="bento-split-main">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* LEFT PANEL: Citizen identity box and dynamic Bulletin previews inside Sidebar on large viewports */}
          <aside className="hidden lg:block lg:col-span-1 space-y-5" id="desktop-sidebar border-r pr-4">
            
            {/* Profile avatar widget */}
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 shadow-2xs text-center relative overflow-hidden" id="identity-badge">
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#FF5200] via-[#FFD600] to-[#FF5200]" />
              <div className="w-16 h-16 rounded-full bg-[#1C1C1F] text-white flex items-center justify-center font-black text-2xl mx-auto shadow-xl border-2 border-[#262626] mt-2">
                स्
              </div>
              <h3 className="font-extrabold text-base mt-3 text-white font-display">स्नेहल प्रकाश सावंत</h3>
              <span className="text-[10px] text-white/40 block font-mono uppercase tracking-wider">प्रभाग क्रमांक: २ रहिवासी</span>
              
              <div className="mt-4 pt-4 border-t border-[#262626] grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-[#1C1C1F] p-2.5 border border-[#262626] rounded">
                  <span className="block text-white/40 text-[9px] font-mono uppercase tracking-widest leading-none mb-1">दाखले अर्ज</span>
                  <strong className="text-white font-mono text-base font-bold">०२</strong>
                </div>
                <div className="bg-[#1C1C1F] p-2.5 border border-[#262626] rounded">
                  <span className="block text-white/40 text-[9px] font-mono uppercase tracking-widest leading-none mb-1">तक्रारी</span>
                  <strong className="text-[#FF5200] font-mono text-base font-bold">०१</strong>
                </div>
              </div>
            </div>

            {/* Local deity devotion box */}
            <div className="bg-[#0F0F0F] text-white rounded-2xl p-5 border border-[#262626] relative overflow-hidden flex flex-col justify-between" id="deity-devotion-banner">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5200]/10 rounded-full blur-xl" />
              <div>
                <span className="text-[9px] uppercase font-mono font-bold tracking-[0.2em] text-[#FFD600]">ग्रामदैवत आशीर्वाद</span>
                <h4 className="text-sm font-black font-display text-white mt-1.5 uppercase tracking-wide">श्री सतेरी देवी मंदिर</h4>
                <p className="text-[11px] text-white/60 leading-relaxed mt-2 font-sans">
                  केर-भेकुर्ली गावाची रक्षक आणि श्रद्धास्थान श्री आदिमाया सतेरी देवी मंदिरातील जत्रोत्सव दरवर्षी उत्साहात साजरा होतो.
                </p>
              </div>
            </div>

            {/* Help desk helpline details */}
            <div className="bg-[#121212] border border-[#262626] rounded-xl p-5 shadow-xs text-xs space-y-3 text-white/70" id="official-contact-desk">
              <span className="block font-black text-white/30 uppercase tracking-[0.2em] text-[9px] font-mono">ग्रामपंचायत संपर्क</span>
              <div className="space-y-2 leading-relaxed font-sans text-[11px]">
                <span className="block">📞 <strong className="text-white">हेल्पलाईन:</strong> <span className="font-mono">९११३ १९२९२८</span></span>
                <span className="block">✉️ <strong className="text-white">ईमेल:</strong> gp.kerbhekurli@gmail.com</span>
                <span className="block">📍 <strong className="text-white">पत्ता:</strong> मु. पो. केर-भेकुर्ली, दोडामार्ग, सिंधुदुर्ग - ४१६५१२</span>
              </div>
            </div>
          </aside>

          {/* MAIN COLUMN VIEWPORT PORT */}
          <section className="lg:col-span-3 min-h-[500px]" id="active-viewport-element">
            {activeTab === "home" && (
              <HomeSection 
                onNavigate={handleNavigate} 
                onOpenChat={() => handleNavigate("chat")}
                onOpenGrievance={() => handleNavigate("notices")}
              />
            )}
            {activeTab === "schemes" && <SchemesSection />}
            {activeTab === "services" && <ServicesSection />}
            {activeTab === "notices" && <NoticesSection />}
            {activeTab === "gallery" && <GallerySection />}
            {activeTab === "chat" && <ChatSection onBack={() => handleNavigate("home")} />}
          </section>

        </div>
      </main>

      {/* 5. APP FOOTER */}
      <footer className="bg-black text-[#A3A3A3] text-xs py-12 mt-auto border-t border-[#262626]" id="portal-footer">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/5 font-display mb-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mb-3">ग्राम लोकसंख्या (Population)</span>
            <span className="text-2xl md:text-4xl font-light tabular-nums text-white">१,८५०<span className="text-xs md:text-sm opacity-50 ml-1">नागरिक</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mb-3">प्रभाग संख्या (Wards)</span>
            <span className="text-2xl md:text-4xl font-light tabular-nums text-white">०३<span className="text-xs md:text-sm opacity-50 ml-1">विभाग</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mb-3">साक्षरता दर (Literacy)</span>
            <span className="text-2xl md:text-4xl font-light tabular-nums text-white">८८%<span className="text-xs md:text-sm opacity-50 ml-1">प्रमाण</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mb-3">भौगोलिक क्षेत्र (Total Area)</span>
            <span className="text-2xl md:text-4xl font-light tabular-nums text-white">७४०<span className="text-xs md:text-sm opacity-50 ml-1">हेक्टर</span></span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm font-display flex items-center gap-1.5 uppercase tracking-wider font-extrabold">
              ग्राम-सहयोग केर-भेकुर्ली
            </h5>
            <p className="text-[11px] leading-relaxed text-[#8E8E93]">
              लोकांसाठी, लोकांच्या सुरक्षिततेसाठी आणि सर्वांगीण गावच्या प्रगतीसाठी, सतेरी देवीच्या आशीर्वादाने आम्ही सदैव वचनबद्ध आहोत। "सांघिक ऐक्य व अभिमानातुन आदर्शगाव" हेच आमचे अंतिम ध्येय आहे।
            </p>
          </div>
          <div className="space-y-3">
            <h6 className="font-bold text-white text-xs uppercase tracking-[0.15em] font-display font-extrabold">महत्त्वाच्या माहिती सूची</h6>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#8E8E93]">
              <button onClick={() => handleNavigate("home")} className="hover:text-white text-left transition-colors font-semibold">मुख्यपृष्ठ</button>
              <button onClick={() => handleNavigate("schemes")} className="hover:text-white text-left transition-colors font-semibold">सरकारी योजना</button>
              <button onClick={() => handleNavigate("services")} className="hover:text-white text-left transition-colors font-semibold">नागरी दाखले</button>
              <button onClick={() => handleNavigate("notices")} className="hover:text-white text-left transition-colors font-semibold">तक्रारी</button>
            </div>
          </div>
          <div className="space-y-3">
            <h6 className="font-bold text-white text-xs uppercase tracking-[0.15em] font-display font-extrabold">डिजिटल क्रांती</h6>
            <p className="text-[11px] leading-relaxed text-[#8E8E93]">
              केर-भेकुर्ली ग्रामपंचायतीचे विकास काम ऑनलाईन पोर्टलद्वारे सुलभ झाले आहे। आम्ही संगणकीकृत दाखले वाटप करणारी मॉडेल ग्रामपंचायत आहोत।
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-[#1C1C1E] text-center text-[10px] text-white/30 font-mono uppercase tracking-wider">
          © {new Date().getFullYear()} ग्रुप ग्रामपंचायत केर-भेकुर्ली (दोडामार्ग, सिंधुदुर्ग) • सर्व हक्क सुरक्षित • डिझाईन आणि विकास डिजिटल नागरी पुढाकार.
        </div>
      </footer>

      {/* 6. MOBILE NAVIGATION STICKY ACCORDION BOTTOM-TAB BAR */}
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#262626] shadow-xl z-40 flex items-center justify-around py-2.5 px-1 font-display" id="mobile-bottom-tabs">
        <button 
          onClick={() => handleNavigate("home")}
          className={`flex flex-col items-center gap-1.5 text-[9px] font-black uppercase tracking-wider ${activeTab === "home" ? "text-white scale-102" : "text-white/40 hover:text-white"}`}
        >
          <Home className="w-5 h-5" />
          <span>मुख्यपृष्ठ</span>
        </button>
        <button 
          onClick={() => handleNavigate("schemes")}
          className={`flex flex-col items-center gap-1.5 text-[9px] font-black uppercase tracking-wider ${activeTab === "schemes" ? "text-white scale-102" : "text-white/40 hover:text-white"}`}
        >
          <Layers className="w-5 h-5" />
          <span>योजना</span>
        </button>
        <button 
          onClick={() => handleNavigate("services")}
          className={`flex flex-col items-center gap-1.5 text-[9px] font-black uppercase tracking-wider ${activeTab === "services" ? "text-white scale-102" : "text-white/40 hover:text-white"}`}
        >
          <FileText className="w-5 h-5" />
          <span>दाखले</span>
        </button>
        <button 
          onClick={() => handleNavigate("notices")}
          className={`flex flex-col items-center gap-1.5 text-[9px] font-black uppercase tracking-wider ${activeTab === "notices" ? "text-white scale-102" : "text-white/40 hover:text-white"}`}
        >
          <Megaphone className="w-5 h-5" />
          <span>तक्रार</span>
        </button>
        <button 
          onClick={() => handleNavigate("chat")}
          className={`flex flex-col items-center gap-1.5 text-[9px] font-black uppercase tracking-wider ${activeTab === "chat" ? "text-[#FF5200] scale-105" : "text-white/40"}`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>ग्राम-मित्र</span>
        </button>
      </footer>

    </div>
  );
}
