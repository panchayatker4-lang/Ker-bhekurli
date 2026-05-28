import React, { useState } from "react";
import { FolderUp, FileCheck, CheckSquare, Search, ArrowRight, BookOpen, Clock, Check, HelpCircle, X } from "lucide-react";

export default function ServicesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState("रहिवासी दाखला");
  const [applicantName, setApplicantName] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    aadhar: null,
    ration: null,
    photo: null,
    declaration: null
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [trackerId, setTrackerId] = useState<string | null>(null);

  // Status lookup on this same page
  const [lookupId, setLookupId] = useState("");
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [lookupError, setLookupError] = useState("");

  const certificateTemplates: { [key: string]: { time: string; fees: string; docs: string[] } } = {
    "रहिवासी दाखला": {
      time: "३ ते ५ दिवस",
      fees: "₹३०/-",
      docs: ["आधार कार्ड (Aadhar Card)", "शिधापत्रिका झेरॉक्स (Ration Card Copy)", "स्वघोषणा पत्र (Self Declaration Form)", "पासपोर्ट साईज फोटो"]
    },
    "जन्म नोंदणी दाखला": {
      time: "२ दिवस",
      fees: "₹२०/-",
      docs: ["रुग्णालय डिस्चार्ज कार्ड (Discharge Card)", "पालकांचे आधार कार्ड", "स्वघोषणा पत्र", "पासपोर्ट साईज फोटो"]
    },
    "मृत्यू नोंदणी दाखला": {
      time: "२ दिवस",
      fees: "₹२०/-",
      docs: ["रुग्णालयातील मृत्यू अहवाल", "मृत व्यक्तीचे आधार कार्ड", "अर्जदाराचे आधार कार्ड", "स्वघोषणा पत्र"]
    },
    "उत्पन्नाचा दाखला": {
      time: "७ दिवस",
      fees: "₹५०/-",
      docs: ["तलाठी उत्पन्न अहवाल (Talathi Income Report)", "आधार कार्ड", "रेशन कार्ड झेरॉक्स", "स्वघोषणा पत्र"]
    },
    "जातीचा दाखला": {
      time: "१५ दिवस",
      fees: "₹५०/-",
      docs: ["शाळा सोडल्याचा दाखला (TC)", "वडिलांचा जातीचा पुरावा", "आधार कार्ड", "रेशन कार्ड झेरॉक्स आणि घोषणा पत्र"]
    }
  };

  const currentTemplate = certificateTemplates[selectedCertificate];

  const handleFileChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [key]: e.target.files![0] }));
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !aadharNumber) {
      alert("कृपया नाव आणि आधार क्रमांक प्रविष्ट करा.");
      return;
    }

    if (!files.aadhar) {
      alert("कृपया आधार कार्ड स्कॅन प्रत अपलोड करा (अनिवार्य).");
      return;
    }

    setIsUploading(true);

    // High fidelity simulation of application creation
    setTimeout(() => {
      setIsUploading(false);
      const generatedId = `KB-${Math.floor(100 + Math.random() * 900)}`;
      setTrackerId(generatedId);
      
      // Reset variables
      setApplicantName("");
      setAadharNumber("");
      setFiles({
        aadhar: null,
        ration: null,
        photo: null,
        declaration: null
      });
    }, 1500);
  };

  const handleLookupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupId.trim()) return;

    setLookupError("");
    setLookupResult(null);

    try {
      const res = await fetch("/api/services/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingId: lookupId })
      });
      const data = await res.json();
      if (data.success) {
        setLookupResult(data.record);
      } else {
        setLookupError(data.error || "शोधलेला अर्ज सापडला नाही.");
      }
    } catch (err) {
      setLookupError("काहीतरी चूक झाली. कृपया ऑफलाइन ग्रामपंचायत कार्यालयात संपर्क साधा.");
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in text-white" id="services-section">
      {/* 1. Header titles */}
      <div id="services-header" className="border-b border-[#262626] pb-4">
        <h2 className="text-xl md:text-2xl font-black font-display text-white uppercase tracking-tight">डिजिटल नागरी सेवा केंद्र (Citizen Services)</h2>
        <p className="text-xs text-white/50 mt-1">
          घरबसल्या विविध दाखल्यांसाठी ऑनलाईन अर्ज करा, कागदपत्रे सबमिट करा आणि अर्जाची स्थिती ट्रॅक करा.
        </p>
      </div>

      {/* 2. Aaple Sarkar single sign on Portal connection banner */}
      <div className="bg-[#121212] border-2 border-[#FF5200] text-white rounded-xl p-4.5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4" id="aaple-sarkar-portal-banner">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#FF5200]/10 border border-[#FF5200]/35 text-[#FF5200] text-[9px] uppercase font-mono tracking-wider font-bold px-2 py-0.5 rounded">MAHA GOV</span>
            <h3 className="font-extrabold text-sm md:text-base font-display uppercase tracking-tight">Aaple Sarkar (आपले सरकार)</h3>
          </div>
          <p className="text-xs text-white/60 mt-1.5 leading-relaxed font-sans">
            लोकसेवा हक्क अधिनियमांतर्गत आपले सरकार सेवांशी थेट लिंक. नागरी सेवा केंद्रात प्रलंबित अर्जांचे सविस्तर निराकरण.
          </p>
        </div>
        <a 
          href="https://aaplesarkar.mahaonline.gov.in" 
          target="_blank" 
          rel="noreferrer"
          className="bg-white hover:bg-neutral-100 text-black text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-md shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          पोर्टलला भेट द्या <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* 3. Responsive split layout: Certificate lists + Document uploder checkform */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="services-split-grid">
        {/* Left Column: Choose Certificate */}
        <div className="space-y-4" id="certificate-selector-column">
          <div className="bg-[#121212] border border-[#262626] rounded-xl p-4.5 shadow-sm">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3.5 font-mono">दाखला निवडा (Select Certificate)</h3>
            <div className="space-y-2" id="certificate-button-list">
              {Object.keys(certificateTemplates).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedCertificate(name)}
                  className={`w-full text-left p-3 rounded-lg text-xs font-bold flex items-center justify-between transition-all border cursor-pointer ${
                    selectedCertificate === name
                      ? "bg-white border-white text-black text-black"
                      : "bg-[#1C1C1F] hover:bg-[#262626] border-[#262626] text-white/70"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 shrink-0" />
                    {name}
                  </span>
                  <Check className={`w-3.5 h-3.5 shrink-0 ${selectedCertificate === name ? "text-black opacity-100" : "opacity-0"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Guidelines card for the currently selected certificate */}
          <div className="bg-[#121212] border border-[#262626] rounded-xl p-4.5 shadow-sm" id="certificate-guide-card">
            <div className="flex items-center gap-1.5 text-white border-b border-[#262626] pb-3 mb-3.5">
              <BookOpen className="w-4.5 h-4.5 text-[#FF5200]" />
              <h4 className="text-xs md:text-sm font-extrabold font-display uppercase tracking-tight">{selectedCertificate} नियम व शुल्क</h4>
            </div>
            
            <div className="text-xs space-y-3 text-white/70 font-sans">
              <div className="flex justify-between items-center bg-[#1C1C1F] border border-[#262626] p-2.5 rounded-lg">
                <span className="text-white/40">⏱️ लागणारा वेळ:</span>
                <span className="font-extrabold text-white">{currentTemplate.time}</span>
              </div>
              <div className="flex justify-between items-center bg-[#1C1C1F] border border-[#262626] p-2.5 rounded-lg">
                <span className="text-white/40">💵 अधिकृत फी:</span>
                <span className="font-black text-[#FF5200]">{currentTemplate.fees}</span>
              </div>

              <div className="pt-2">
                <span className="block font-bold text-[10px] text-white/40 uppercase tracking-widest mb-2 font-mono">आवश्यक कागदपत्रे:</span>
                <ul className="space-y-2" id="required-docs-checklist">
                  {currentTemplate.docs.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] leading-relaxed text-white/80">
                      <CheckSquare className="w-3.5 h-3.5 text-[#FF5200] shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns (col-span-2): Application Form and File Compilation upload slot */}
        <div className="lg:col-span-2 bg-[#121212] border border-[#262626] rounded-xl p-5 md:p-6 shadow-sm space-y-5" id="application-form-column">
          <div className="border-b border-[#262626] pb-3.5">
            <h3 className="text-base md:text-lg font-extrabold font-display text-white uppercase tracking-tight">
              {selectedCertificate} ऑनलाईन अर्ज
            </h3>
            <p className="text-xs text-white/50 mt-1">दाखल्याच्या जलद मंजुरीसाठी अचूक माहिती आणि डिजिटल स्कॅन प्रती अपलोड करा.</p>
          </div>

          {trackerId ? (
            <div className="py-8 text-center space-y-4 animate-scale-up z-20" id="service-application-success">
              <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mx-auto text-xl shadow-lg font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-extrabold text-base text-white uppercase tracking-tight">अर्ज यशस्वीरित्या सबमिट केला!</h4>
                <p className="text-xs text-white/50 mt-1 font-sans">कागदपत्रांची डिजिटल पडताळणी प्रभाग स्तरावर सुरू झाली आहे.</p>
              </div>

              <div className="bg-[#1C1C1F] border border-[#262626] p-4.5 rounded-xl max-w-xs mx-auto space-y-1.5">
                <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest block font-mono">अर्ज क्रमांक (Tracking Number)</span>
                <strong className="text-lg text-[#FF5200] font-mono tracking-wider">{trackerId}</strong>
                <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded uppercase font-bold mt-1.5 inline-block font-mono">
                  Pending Verification
                </span>
              </div>

              <p className="text-xs text-white/40 max-w-sm mx-auto leading-relaxed font-sans">
                हा अर्ज क्रमांक जवळ ठेवा. तुम्ही मुखपृष्ठावर किंवा खालील अर्ज ट्रॅकरद्वारे या अर्जाची थेट स्थिती कधीही तपासू शकता.
              </p>

              <button 
                onClick={() => setTrackerId(null)}
                className="bg-white hover:bg-neutral-100 text-black text-xs font-black uppercase tracking-wider px-6 py-3 rounded-lg transition-colors cursor-pointer"
              >
                नवीन दाखल्यासाठी अर्ज करा 📁
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="space-y-4" id="digital-service-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">अर्जदाराचे नाव (मराठी/इंग्रजी)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="उदा. स्नेहल सावंत..."
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-[#1C1C1F] border border-[#262626] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF5200] text-white font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">आधार नंबर (१२ अंकी)</label>
                  <input 
                    type="text" 
                    maxLength={12}
                    required
                    placeholder="उदा. १२३४ ५६७८ ९०१२..."
                    value={aadharNumber}
                    onChange={(e) => setAadharNumber(e.target.value)}
                    className="w-full bg-[#1C1C1F] border border-[#262626] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF5200] text-white font-mono tracking-widest text-center"
                  />
                </div>
              </div>

              {/* Document upload fields mapped to currently chosen certificate requirements */}
              <div className="space-y-3 pt-2" id="file-uploader-grid">
                <span className="block font-bold text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2 font-mono">डिजिटल कागदपत्रे जोडा</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
                  {/* Document slot 1 (Aadhar scan - Mandatoy) */}
                  <div className="border border-dashed border-[#262626] hover:border-[#FF5200]/60 rounded-xl p-3 relative flex items-center justify-between bg-[#1C1C1F]/40 group transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-[#FF5200]/10 text-[#FF5200] border border-[#FF5200]/20 flex items-center justify-center shrink-0">
                        <FolderUp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-white block">१. आधार कार्ड *</span>
                        <span className="text-[9px] text-white/45 block truncate max-w-[120px] font-sans">
                          {files.aadhar ? files.aadhar.name : "स्कॅन्ड कॉपी (अनिवार्य)"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <input 
                        type="file" 
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileChange("aadhar", e)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        id="file-aadhar"
                      />
                      <span className={`text-[9px] font-mono font-bold px-2 py-1 rounded shadow-sm ${files.aadhar ? "bg-green-500/10 text-green-400 border border-green-500/25" : "bg-white text-black"}`}>
                        {files.aadhar ? "Y" : "CHOOSE"}
                      </span>
                    </div>
                  </div>

                  {/* Document slot 2 (Ration scan) */}
                  <div className="border border-dashed border-[#262626] hover:border-[#FF5200]/60 rounded-xl p-3 relative flex items-center justify-between bg-[#1C1C1F]/40 group transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-[#FF5200]/10 text-[#FF5200] border border-[#FF5200]/20 flex items-center justify-center shrink-0">
                        <FolderUp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-white block">२. शिधापत्रिका झेरॉक्स</span>
                        <span className="text-[9px] text-white/45 block truncate max-w-[120px] font-sans">
                          {files.ration ? files.ration.name : "रेशन कार्ड झेरॉक्स परत"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <input 
                        type="file" 
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileChange("ration", e)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        id="file-ration"
                      />
                      <span className={`text-[9px] font-mono font-bold px-2 py-1 rounded shadow-sm ${files.ration ? "bg-green-500/10 text-green-400 border border-green-500/25" : "bg-white text-black"}`}>
                        {files.ration ? "Y" : "CHOOSE"}
                      </span>
                    </div>
                  </div>

                  {/* Document slot 3 (Photo scan) */}
                  <div className="border border-dashed border-[#262626] hover:border-[#FF5200]/60 rounded-xl p-3 relative flex items-center justify-between bg-[#1C1C1F]/40 group transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-[#FF5200]/10 text-[#FF5200] border border-[#FF5200]/20 flex items-center justify-center shrink-0">
                        <FolderUp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-white block">३. पासपोर्ट फोटो</span>
                        <span className="text-[9px] text-white/45 block truncate max-w-[120px] font-sans">
                          {files.photo ? files.photo.name : "सद्य पासपोर्ट साईज फोटो"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileChange("photo", e)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        id="file-photo"
                      />
                      <span className={`text-[9px] font-mono font-bold px-2 py-1 rounded shadow-sm ${files.photo ? "bg-green-500/10 text-green-400 border border-green-500/25" : "bg-white text-black"}`}>
                        {files.photo ? "Y" : "CHOOSE"}
                      </span>
                    </div>
                  </div>

                  {/* Document slot 4 (Self declaration scan) */}
                  <div className="border border-dashed border-[#262626] hover:border-[#FF5200]/60 rounded-xl p-3 relative flex items-center justify-between bg-[#1C1C1F]/40 group transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-[#FF5200]/10 text-[#FF5200] border border-[#FF5200]/20 flex items-center justify-center shrink-0">
                        <FolderUp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-white block">४. स्वघोषणा पत्र</span>
                        <span className="text-[9px] text-white/45 block truncate max-w-[120px] font-sans">
                          {files.declaration ? files.declaration.name : "अप्रतिज्ञापत्र स्वाक्षरी प्रत"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <input 
                        type="file" 
                        accept="image/*,application/pdf"
                        onChange={(e) => handleFileChange("declaration", e)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        id="file-declaration"
                      />
                      <span className={`text-[9px] font-mono font-bold px-2 py-1 rounded shadow-sm ${files.declaration ? "bg-green-500/10 text-green-400 border border-green-500/25" : "bg-white text-black"}`}>
                        {files.declaration ? "Y" : "CHOOSE"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-white/30 flex justify-between font-mono uppercase tracking-wider mt-1.5">
                  <span>* Limit: ५ MB per file</span>
                  <span>Allowed: JPEG, PNG, PDF</span>
                </div>
              </div>

              {/* Submitting button */}
              <button 
                type="submit"
                disabled={isUploading}
                className="w-full bg-white hover:bg-neutral-100 disabled:bg-[#1C1C1F] disabled:text-white/20 text-black font-black uppercase tracking-wider text-xs py-3.5 rounded-xl shadow-lg transition-all text-center cursor-pointer mt-2"
              >
                {isUploading ? "कागदपत्रे अपलोड होत आहेत (Uploading)..." : `डिजिटल स्वाक्षरी करून ${selectedCertificate} दाखल करा 📂`}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Lookup check form inside services page */}
      <div className="bg-[#121212] border border-[#262626] rounded-xl p-5 md:p-6 shadow-sm" id="services-tracker-form">
        <div className="flex justify-between items-center pb-3 border-b border-[#262626] mb-4">
          <div>
            <h3 className="text-sm font-extrabold font-display uppercase tracking-tight text-white">दाखला अर्ज स्थिती ट्रॅकर</h3>
            <p className="text-xs text-white/50 mt-1">दाखल्याच्या अर्जाचे प्रत्यक्ष काम कोणत्या पातळीवर आहे ते पहा.</p>
          </div>
          <Clock className="w-5 h-5 text-white/30" />
        </div>

        <form onSubmit={handleLookupSubmit} className="flex gap-2">
          <input 
            type="text" 
            placeholder="उदा. KB908, KB844..." 
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
            className="flex-1 bg-[#1C1C1F] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF5200] text-white font-mono placeholder:text-white/20"
          />
          <button 
            type="submit" 
            className="bg-white hover:bg-neutral-100 text-black px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            अर्ज शोधा
          </button>
        </form>

        {lookupError && <p className="text-red-500 text-xs mt-2 font-mono">{lookupError}</p>}

        {lookupResult && (
          <div className="mt-4 bg-[#1C1C1F] border border-[#FF5200]/20 rounded-xl p-4 md:p-5 animate-slide-up space-y-4">
            <div className="flex justify-between items-start border-b border-[#262626] pb-3">
              <div>
                <strong className="text-sm font-extrabold text-white block">{lookupResult.name}</strong>
                <span className="text-[11px] text-white/50 block mt-1">अर्जदार: {lookupResult.applicant} • दाखल तारीख: <span className="font-mono">{lookupResult.date}</span></span>
              </div>
              <span className={`text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-sm font-black shadow-lg ${
                lookupResult.status === "पूर्ण" 
                  ? "bg-green-500/10 text-green-400 border border-green-500/25" 
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/25"
              }`}>
                {lookupResult.status === "पूर्ण" ? "COMPLETED" : "IN PROGRESS"}
              </span>
            </div>

            {/* Simple timeline tree */}
            <div className="pt-2 text-xs space-y-3 font-sans">
              <span className="block font-bold text-white/40 uppercase tracking-[0.2em] text-[9px] font-mono">प्रगति अहवाल (Progress Report)</span>
              
              <div className="space-y-4 relative pl-5.5 before:absolute before:inset-y-1.5 before:left-2 before:w-[1px] before:bg-[#262626]">
                <div className="relative before:absolute before:top-1.5 before:-left-5.5 before:w-3 before:h-3 before:rounded-full before:bg-green-500 border border-transparent">
                  <span className="font-bold text-white block">१. अर्ज यशस्वी दाखल (Application Logged)</span>
                  <p className="text-[10px] text-white/45 mt-0.5">डिजिटल नागरी सेवा केंद्र प्रणालीद्वारे यशस्वी वर्ग.</p>
                </div>
                <div className="relative before:absolute before:top-1.5 before:-left-5.5 before:w-3 before:h-3 before:rounded-full before:bg-green-500 border border-transparent">
                  <span className="font-bold text-white block">२. प्रभाग स्तरावर मंजुरी (Tehsildar Clearance)</span>
                  <p className="text-[10px] text-white/45 mt-0.5">ग्रामसेवक स्वाक्षरी व आधार संलग्नीकरण तपासणी पूर्ण.</p>
                </div>
                <div className={`relative before:absolute before:top-1.5 before:-left-5.5 before:w-3 before:h-3 before:rounded-full border border-transparent ${lookupResult.status === 'पूर्ण' ? 'before:bg-green-500' : 'before:bg-amber-500 animate-pulse'}`}>
                  <span className="font-bold text-white block">३. अंतिम मंजुरी व डिजिटल स्वाक्षरी (Final Signature)</span>
                  <p className="text-[10px] text-white/45 mt-0.5">
                    {lookupResult.status === "पूर्ण" ? "पूर्ण झाले व डिजिटल दाखला डाऊनलोडसाठी सज्ज आहे." : "सरपंच व मुख्य कार्यकारी स्तरावर डिजिटल स्वाक्षरी प्रलंबित."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
