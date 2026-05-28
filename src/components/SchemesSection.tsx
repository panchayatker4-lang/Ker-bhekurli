import React, { useState } from "react";
import { Search, Heart, Landmark, CheckCircle2, Share2, Info, ArrowUpRight, Check, X, AlertCircle } from "lucide-react";
import { schemesData } from "../data";
import { Scheme } from "../types";

export default function SchemesSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "women" | "farmer" | "housing" | "pension">("all");
  
  // DBT status check states
  const [showDbtModal, setShowDbtModal] = useState(false);
  const [aadharNumber, setAadharNumber] = useState("");
  const [dbtResult, setDbtResult] = useState<any>(null);
  const [dbtError, setDbtError] = useState("");

  // Application form states
  const [applyingScheme, setApplyingScheme] = useState<Scheme | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantAadhar, setApplicantAadhar] = useState("");
  const [applicantIncome, setApplicantIncome] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);

  // Filter schemes based on search text & category
  const filteredSchemes = schemesData.filter((scheme) => {
    const matchesSearch = 
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" ? true : scheme.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDbtCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setDbtError("");
    setDbtResult(null);

    const cleanAadhar = aadharNumber.trim().replace(/\s/g, "");
    if (!cleanAadhar || cleanAadhar.length !== 12 || isNaN(Number(cleanAadhar))) {
      setDbtError("कृपया १२ अंकी वैध आधार क्रमांक प्रविष्ट करा.");
      return;
    }

    // High fidelity DBT tracking simulation
    setTimeout(() => {
      setDbtResult({
        name: "स्नेहल प्रकाश सावंत",
        schemeName: "मुख्यमंत्री माझी लाडकी बहीण योजना",
        status: "स्वीकृत (Fund Transferred)",
        bank: "भारतीय स्टेट बँक (SBI)",
        accountMask: "********4908",
        transactions: [
          { date: "१५ मे २०२६", amount: "₹१,५००", desc: "मे २०२६ हप्ता", status: "यशस्वी" },
          { date: "१५ एप्रिल २०२६", amount: "₹१,५००", desc: "एप्रिल २०२६ हप्ता", status: "यशस्वी" },
          { date: "१५ मार्च २०२६", amount: "₹१,५००", desc: "मार्च २०२६ हप्ता", status: "यशस्वी" }
        ]
      });
    }, 450);
  };

  const handleApplyScheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantAadhar || !applicantPhone) {
      alert("कृपया सर्व आवश्यक माहिती प्रविष्ट करा.");
      return;
    }

    const trackId = `KB-SCH-${Math.floor(1000 + Math.random() * 9000)}`;
    setApplicationSuccess(trackId);
    
    // Clear forms
    setApplicantName("");
    setApplicantAadhar("");
    setApplicantIncome("");
    setApplicantPhone("");
  };

  const handleShare = (schemeName: string) => {
    if (navigator.share) {
      navigator.share({
        title: schemeName,
        text: `केर-भेकुर्ली ग्रामपंचायत पोर्टलवर ${schemeName} बद्दल सविस्तर माहिती तपासा.`,
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      alert(`लिंक कॉपी केली: ${schemeName} ची माहिती शेअर करा!`);
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in text-white" id="schemes-section">
      {/* 1. Header with description */}
      <div id="schemes-header-container" className="border-b border-[#262626] pb-4">
        <h2 className="text-xl md:text-2xl font-black font-display text-white uppercase tracking-tight">सरकारी योजना (Government Schemes)</h2>
        <p className="text-xs text-white/50 mt-1">
          तुमच्यासाठी आणि तुमच्या कुटुंबासाठी उपलब्ध असलेल्या सर्व केंद्र व राज्य कल्याणकारी योजनांची अधिकृत माहिती.
        </p>
      </div>

      {/* 2. Interactive Gold DBT Status Checker Link */}
      <button 
        onClick={() => {
          setShowDbtModal(true);
          setDbtResult(null);
          setDbtError("");
          setAadharNumber("");
        }}
        className="w-full bg-[#121212] border-2 border-[#FF5200] hover:bg-[#1C1C1F] text-white p-4 rounded-xl flex items-center justify-between shadow-lg cursor-pointer transition-all active:scale-[0.99] font-display"
        id="dbt-status-button"
      >
        <span className="flex items-center gap-2.5 text-xs md:text-sm font-extrabold uppercase tracking-wider text-white">
          <Landmark className="w-5 h-5 text-[#FF5200]" />
          💻 DBT स्थिती तपासा (Check DBT Status)
        </span>
        <span className="text-[9px] font-mono font-bold tracking-wider bg-[#FF5200]/10 text-[#FF5200] border border-[#FF5200]/25 rounded px-2.5 py-1 uppercase animate-pulse">मंजूर हप्ते पहा 👉</span>
      </button>

      {/* 3. Search Bar */}
      <div className="relative" id="schemes-search-bar">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30" />
        <input 
          type="text" 
          placeholder="योजनेचे नाव किंवा विभाग शोधा..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#121212] border border-[#262626] rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-[#FF5200] text-white placeholder:text-white/20"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white/30 hover:text-white"
          >
            साफ करा
          </button>
        )}
      </div>

      {/* 4. Categories Selection Row matching Images */}
      <div>
        <h3 className="text-xs font-bold text-white/45 uppercase tracking-[0.2em] mb-3 font-mono">श्रेणीनुसार विभाग</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3" id="schemes-category-grid">
          <button 
            onClick={() => setSelectedCategory("all")}
            className={`p-3 rounded-xl border text-[10px] font-extrabold uppercase tracking-wide flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
              selectedCategory === "all" 
                ? "bg-[#FF5200] border-[#FF5200] text-white shadow-lg font-black" 
                : "bg-[#121212] border-[#262626] text-white/60 hover:text-white hover:bg-[#1C1C1F]"
            }`}
          >
            <span>📁 सर्व योजना</span>
          </button>

          <button 
            onClick={() => setSelectedCategory("women")}
            className={`p-3 rounded-xl border text-[10px] font-extrabold uppercase tracking-wide flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
              selectedCategory === "women" 
                ? "bg-[#FF5200] border-[#FF5200] text-white shadow-lg font-black" 
                : "bg-[#121212] border-[#262626] text-white/60 hover:text-white hover:bg-[#1C1C1F]"
            }`}
          >
            <span>👩 महिला कल्याण</span>
          </button>

          <button 
            onClick={() => setSelectedCategory("farmer")}
            className={`p-3 rounded-xl border text-[10px] font-extrabold uppercase tracking-wide flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
              selectedCategory === "farmer" 
                ? "bg-[#FF5200] border-[#FF5200] text-white shadow-lg font-black" 
                : "bg-[#121212] border-[#262626] text-white/60 hover:text-white hover:bg-[#1C1C1F]"
            }`}
          >
            <span>🚜 कृषी विकास</span>
          </button>

          <button 
            onClick={() => setSelectedCategory("housing")}
            className={`p-3 rounded-xl border text-[10px] font-extrabold uppercase tracking-wide flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
              selectedCategory === "housing" 
                ? "bg-[#FF5200] border-[#FF5200] text-white shadow-lg font-black" 
                : "bg-[#121212] border-[#262626] text-white/60 hover:text-white hover:bg-[#1C1C1F]"
            }`}
          >
            <span>🏠 घरकुल योजना</span>
          </button>

          <button 
            onClick={() => setSelectedCategory("pension")}
            className={`p-3 rounded-xl border text-[10px] font-extrabold uppercase tracking-wide flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${
              selectedCategory === "pension" 
                ? "bg-[#FF5200] border-[#FF5200] text-white shadow-lg font-black" 
                : "bg-[#121212] border-[#262626] text-white/60 hover:text-white hover:bg-[#1C1C1F]"
            }`}
          >
            <span>👵 निवृत्तीवेतन</span>
          </button>
        </div>
      </div>

      {/* 5. Popular Schemes Title */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] font-mono">लोकप्रिय योजना (Popular Schemes)</h3>
          <span className="text-[10px] bg-[#1C1C1F] border border-[#262626] px-2.5 py-1 text-white/80 font-bold uppercase tracking-wider font-mono">एकूण: {filteredSchemes.length}</span>
        </div>

        <div className="space-y-4" id="schemes-list-display">
          {filteredSchemes.length === 0 ? (
            <div className="bg-[#121212] border border-[#262626] rounded-2xl p-10 text-center" id="schemes-empty">
              <p className="text-xs text-white/40 font-mono uppercase tracking-wide">शोधलेली योजना सापडली नाही. कृपया नवीन शब्द वापरा.</p>
            </div>
          ) : (
            filteredSchemes.map((scheme) => {
              const isPopularHero = scheme.id === "sch-1"; // Render CM Ladki Bahin inside larger styled hero layout
              
              if (isPopularHero) {
                return (
                  <div 
                    key={scheme.id}
                    className="bg-[#121212] border-2 border-[#FF5200]/45 rounded-2xl p-5 md:p-6 relative shadow-lg"
                    id={`scheme-card-${scheme.id}`}
                  >
                    <span className="absolute top-4 right-4 bg-[#FF5200] text-white text-[9px] uppercase tracking-widest font-mono font-black px-2.5 py-1 rounded shadow-sm">
                      {scheme.tag} ★★★
                    </span>
                    <span className="text-[10px] font-bold text-[#FF5200] block uppercase tracking-wider font-mono">{scheme.department}</span>
                    <h3 className="text-lg md:text-xl font-extrabold font-display text-white mt-1 uppercase">
                      {scheme.name}
                    </h3>
                    <p className="text-xs text-white/60 mt-3 leading-relaxed font-sans">
                      {scheme.description}
                    </p>

                    <div className="mt-4 bg-[#1C1C1F] border border-[#262626] rounded-xl p-4.5 space-y-3">
                      <div className="flex items-start gap-2.5 text-xs">
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#FF5200] shrink-0 mt-0.5" />
                        <span className="text-white/80 font-sans"><strong>पात्रता:</strong> {scheme.eligibility}</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs">
                        <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
                        <span className="text-white/80 font-sans"><strong>लाभ:</strong> {scheme.benefit}</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4.5 border-t border-[#262626] flex gap-3">
                      <button 
                        onClick={() => {
                          setApplyingScheme(scheme);
                          setApplicationSuccess(null);
                        }}
                        className="flex-1 bg-white hover:bg-neutral-100 text-black text-xs font-black uppercase tracking-wider py-3 rounded-xl shadow-lg transition-colors cursor-pointer"
                      >
                        आत्ताच अर्ज करा ✍️
                      </button>
                      <button 
                        onClick={() => handleShare(scheme.name)}
                        className="bg-[#1C1C1F] hover:bg-[#262626] border border-[#262626] rounded-xl p-3 text-white transition-all cursor-pointer"
                        title="माहिती शेअर करा"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div 
                  key={scheme.id}
                  className="bg-[#121212] border border-[#262626] rounded-2xl p-5 shadow-sm hover:border-[#262626]/80 transition-all"
                  id={`scheme-card-${scheme.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-white/30 block uppercase tracking-wider">{scheme.department}</span>
                      <h4 className="text-sm md:text-base font-extrabold font-display text-white mt-0.5">{scheme.name}</h4>
                    </div>
                    <span className="bg-[#FF5200]/10 border border-[#FF5200]/25 text-[#FF5200] text-[9px] font-mono tracking-wide px-2 py-0.5 rounded font-bold uppercase">
                      {scheme.tag}
                    </span>
                  </div>

                  <p className="text-xs text-white/60 mt-3.5 leading-relaxed font-sans">
                    {scheme.description}
                  </p>

                  <div className="mt-4 bg-[#1C1C1F] border border-[#262626] rounded-xl p-3.5 text-xs text-white/80 space-y-2 font-sans">
                    <span className="block leading-relaxed"><strong>पात्रता:</strong> {scheme.eligibility}</span>
                    <span className="block text-[#FF5200] leading-relaxed"><strong>लाभ:</strong> {scheme.benefit}</span>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-[#262626] flex gap-2" id="scheme-card-actions">
                    <button 
                      onClick={() => {
                        setApplyingScheme(scheme);
                        setApplicationSuccess(null);
                      }}
                      className="flex-1 bg-white hover:bg-neutral-100 text-black font-black uppercase tracking-wider text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      माहिती व अर्ज करा
                    </button>
                    <button 
                      onClick={() => handleShare(scheme.name)}
                      className="bg-[#1C1C1F] hover:bg-[#262626] border border-[#262626] rounded-lg px-3 text-white transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 6. Illustrative decorative section: "Sanjay Gandhi Niradhar Sceheme" couple banner */}
      <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 flex flex-col md:flex-row items-center gap-4" id="featured-pension-card">
        <div className="w-full md:w-36 h-24 overflow-hidden rounded-xl bg-neutral-900 shadow-sm shrink-0 border border-[#262626]/80">
          <img 
            src="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=200" 
            alt="वयोवृद्ध" 
            className="w-full h-full object-cover grayscale opacity-40 hover:opacity-60 transition-opacity"
          />
        </div>
        <div>
          <span className="bg-[#FF5200]/10 border border-[#FF5200]/30 text-[#FF5200] text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded font-black">विशेष वृद्ध योजना</span>
          <h4 className="text-sm font-extrabold font-display text-white mt-1.5">संजय गांधी निराधार योजना</h4>
          <p className="text-xs text-white/50 mt-1 max-w-md leading-relaxed font-sans">
            वृद्ध, अपंग आणि निराधार व्यक्तींसाठी मासिक आर्थिक सहाय्य देणारी योजना. नोंदणीसाठी अधिकृत वयाचा दाखला आवश्यक आहे.
          </p>
          <div className="mt-4 flex gap-4 text-xs font-black uppercase tracking-wider font-mono">
            <button 
              onClick={() => {
                const s = schemesData.find(x => x.id === "sch-4") || schemesData[0];
                setApplyingScheme(s);
                setApplicationSuccess(null);
              }}
              className="hover:text-[#FF5200] text-[#FF5200] transition-colors flex items-center gap-1 cursor-pointer"
            >
              अर्ज करा <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => alert("नियमावली: १. वय ६५ वर्षांपेक्षा अधिक किंवा दिव्यांगता ४०% पेक्षा अधिक असावी. २. वार्षिक उत्पन्न अल्प असावे.")}
              className="hover:text-white text-white/40 transition-colors cursor-pointer"
            >
              नियम वाचा
            </button>
          </div>
        </div>
      </div>

      {/* DBT STATUS CHECK MODAL */}
      {showDbtModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" id="dbt-modal">
          <div className="bg-[#121212] border border-[#262626] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-up">
            <div className="bg-[#0D0D0D] border-b border-[#262626] p-4.5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#FF5200]" />
                <h3 className="font-extrabold text-sm md:text-base font-display uppercase tracking-tight text-white">थेट लाभ हस्तांतरण (DBT STATUS)</h3>
              </div>
              <button 
                onClick={() => setShowDbtModal(false)}
                className="text-white/40 hover:text-white bg-white/5 border border-white/10 p-1.5 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              <form onSubmit={handleDbtCheck} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">नागरिकाचा आधार क्रमांक</label>
                  <input 
                    type="password" 
                    maxLength={12}
                    placeholder="उदा. १२३४ ५६७८ ९०१२..."
                    value={aadharNumber}
                    onChange={(e) => setAadharNumber(e.target.value)}
                    className="w-full bg-[#1C1C1F] border border-[#262626] rounded-lg px-3 py-3 text-sm text-center tracking-widest font-mono text-white focus:outline-none focus:ring-1 focus:ring-[#FF5200]"
                  />
                  <span className="text-[10px] text-white/30 mt-2 block font-sans">प्रत्येकाचा आधार क्रमांक सुरक्षित असतो आणि तो फक्त तपासणीसाठी वापरला जातो.</span>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-white hover:bg-neutral-100 text-black font-black uppercase tracking-wider text-xs py-3 rounded-lg shadow-lg cursor-pointer transition-colors"
                >
                  डिजिटल पेमेंट ट्रॅक करा (Track Payment)
                </button>
              </form>

              {dbtError && (
                <div className="mt-4 p-3.5 bg-red-500/10 text-red-400 text-xs rounded-lg flex items-center gap-2 border border-red-500/20">
                  <AlertCircle className="w-4.5 h-4.5 text-red-400 shrink-0" />
                  <span>{dbtError}</span>
                </div>
              )}

              {dbtResult && (
                <div className="mt-5 border-t border-[#262626] pt-4 space-y-4 font-sans animate-slide-up">
                  <div className="bg-green-500/10 text-green-400 p-3 text-xs rounded-lg border border-green-500/20" id="dbt-status-banner">
                    🟢 लाभार्थी: <strong>{dbtResult.name}</strong> • स्वीकृत
                  </div>
                  
                  <div className="text-xs space-y-1.5 bg-[#1C1C1F] p-3.5 rounded-lg border border-[#262626] text-white/80">
                    <span className="block"><strong>योजना:</strong> {dbtResult.schemeName}</span>
                    <span className="block font-mono"><strong>बँक:</strong> {dbtResult.bank} ({dbtResult.accountMask})</span>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">जमा झालेले हप्ते:</h5>
                    <div className="space-y-1.5" id="dbt-transactions-list">
                      {dbtResult.transactions.map((tx: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-xs bg-[#1C1C1F] border border-[#262626] p-3 rounded-xl shadow-xs">
                          <div>
                            <span className="block font-bold text-white">{tx.desc}</span>
                            <span className="text-[10px] text-white/30 font-mono mt-0.5 block">{tx.date}</span>
                          </div>
                          <span className="text-green-400 font-bold font-mono text-sm">{tx.amount} <Check className="w-3 h-3 inline-block ml-0.5" /></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SCHEME APPLICATION SUBMISSION MODAL */}
      {applyingScheme && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" id="apply-modal">
          <div className="bg-[#121212] border border-[#262626] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-up">
            <div className="bg-[#0D0D0D] border-b border-[#262626] p-4.5 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-sm md:text-base font-display uppercase tracking-tight text-white">योजना ऑनलाईन अर्ज</h3>
                <span className="text-[10px] text-white/45 block max-w-[280px] truncate leading-normal mt-0.5">{applyingScheme.name}</span>
              </div>
              <button 
                onClick={() => setApplyingScheme(null)}
                className="text-white/40 hover:text-white bg-white/5 border border-white/10 p-1.5 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5" id="scheme-apply-body">
              {!applicationSuccess ? (
                <form onSubmit={handleApplyScheme} className="space-y-4" id="scheme-apply-form">
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">अर्जदाराचे संपूर्ण नाव (मराठी/इंग्रजी)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="उदा. स्नेहल प्रकाश सावंत..."
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full bg-[#1C1C1F] border border-[#262626] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FF5200]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">आधार क्रमांक</label>
                      <input 
                        type="text" 
                        maxLength={12}
                        required
                        placeholder="१२ अंकी क्रमांक..."
                        value={applicantAadhar}
                        onChange={(e) => setApplicantAadhar(e.target.value)}
                        className="w-full bg-[#1C1C1F] border border-[#262626] rounded-lg px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-[#FF5200]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">वार्षिक उत्पन्न</label>
                      <input 
                        type="number" 
                        placeholder="उदा. ९०,०००..."
                        value={applicantIncome}
                        onChange={(e) => setApplicantIncome(e.target.value)}
                        className="w-full bg-[#1C1C1F] border border-[#262626] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FF5200]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">मोबाईल नंबर</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="उदा. ९८XXXXXXXX..."
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full bg-[#1C1C1F] border border-[#262626] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FF5200]"
                    />
                  </div>

                  <div className="bg-[#1C1C1F] border border-[#262626] rounded-xl p-3 text-[10px] text-white/50 leading-relaxed font-sans">
                    ⚠️ <strong>नियमावली:</strong> अर्ज सबमिट केल्यानंतर कागदपत्रांची पडताळणी प्रभाग क्र. २ ग्रामसेवक स्तरावरून करण्यात येते. पडताळणी पूर्ण झाल्यावर थेट बँक खात्यात पेमेंट्स जमा होण्यास सुरुवात होईल.
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-white hover:bg-neutral-100 text-black font-black uppercase tracking-wider text-xs py-3 rounded-lg shadow-lg cursor-pointer transition-colors mt-2"
                  >
                    डिजिटल स्वाक्षरीसह दाखल करा
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4 animate-scale-up" id="apply-success-box">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mx-auto text-xl shadow-lg font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-white uppercase tracking-tight">अर्ज यशस्वीपणे दाखल झाला!</h4>
                    <p className="text-xs text-white/50 mt-1 font-sans">तुमचा अर्ज केर-भेकुर्ली ग्रामपंचायत कार्यालयात प्रक्रियाधीन आहे.</p>
                  </div>

                  <div className="bg-[#1C1C1F] border border-[#262626] p-3.5 rounded-xl max-w-xs mx-auto">
                    <span className="text-[9px] text-white/40 uppercase tracking-[0.15em] block font-bold font-mono">अर्ज ट्रॅकिंग क्रमांक</span>
                    <strong className="text-base text-[#FF5200] font-mono tracking-wide block mt-1">{applicationSuccess}</strong>
                  </div>

                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono">STATUS: प्रलंबित (प्रभाग क्र. २ पडताळणी प्रगतीपथावर)</p>

                  <button 
                    onClick={() => setApplyingScheme(null)}
                    className="w-full bg-[#1C1C1F] hover:bg-[#262626] border border-[#262626] text-white font-extrabold uppercase tracking-wide text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    बंद करा
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
