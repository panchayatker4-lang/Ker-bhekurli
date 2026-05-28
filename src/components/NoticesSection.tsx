import React, { useState, useEffect } from "react";
import { Megaphone, AlertTriangle, Send, FileCheck, CheckCircle2, ClipboardList, Camera, HelpCircle, FileText, X } from "lucide-react";
import { noticesData } from "../data";
import { Notice, Complaint } from "../types";

export default function NoticesSection() {
  const [notices, setNotices] = useState<Notice[]>(noticesData);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [complaintType, setComplaintType] = useState("दिवाबत्ती (Broken Lamps)");
  const [complaintDesc, setComplaintDesc] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<any | null>(null);

  // Fetch complaints from server
  const fetchComplaints = async () => {
    try {
      const res = await fetch("/api/complaints");
      const data = await res.json();
      setComplaints(data);
    } catch (e) {
      console.error("Error loading complaints", e);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintDesc.trim()) return;

    setLoading(true);
    setFormSuccess(null);

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: complaintType,
          description: complaintDesc,
          photo: photoPreview
        })
      });
      const data = await res.json();
      if (data.success) {
        setFormSuccess(data.record);
        setComplaintDesc("");
        setPhotoPreview(null);
        // Refresh local history automatically
        fetchComplaints();
      } else {
        alert(data.error || "तक्रार दाखल करताना त्रुटी आली.");
      }
    } catch (err) {
      alert("सर्व्हरशी संपर्क साधता आला नाही.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in text-white" id="notices-section">
      {/* 1. Page Header */}
      <div id="notices-header-container" className="border-b border-[#262626] pb-4">
        <h2 className="text-xl md:text-2xl font-black font-display text-white uppercase tracking-tight">सूचना आणि तक्रार केंद्र (Grievance & Notices)</h2>
        <p className="text-xs text-white/50 mt-1">
          ग्रामपंचायत कार्यालयाकडून प्रसिद्ध झालेल्या अधिकृत शासकीय घोषणा पहा आणि आपल्या समस्यांचे निराकरण करून घ्या.
        </p>
      </div>

      {/* Grid: Left Column Notice Board, Right Column Complaints Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="notices-split-grid">
        
        {/* LEFT COLUMN: Notice Board (सूचना फलक) */}
        <div className="space-y-4" id="notice-board-container">
          <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
            <h3 className="text-sm font-extrabold font-display uppercase tracking-tight text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#FF5200]" />
              सूचना फलक (Notice Board)
            </h3>
            <span className="text-[10px] font-mono tracking-widest text-[#FF5200] font-black uppercase">केर-भेकुर्ली</span>
          </div>

          <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1" id="notices-inner-scroll">
            {notices.map((notice) => (
              <div 
                key={notice.id}
                className={`border rounded-2xl p-5 relative transition-all ${
                  notice.urgent 
                    ? "bg-[#121212] border-red-500/35" 
                    : "bg-[#121212]/95 border-[#262626]"
                }`}
                id={`notice-item-${notice.id}`}
              >
                {notice.urgent && (
                  <span className="absolute top-4 right-4 bg-red-600 text-white text-[8px] tracking-widest uppercase font-mono font-black px-2 py-0.5 rounded flex items-center gap-1 shadow-md animate-pulse">
                    <AlertTriangle className="w-3 h-3" /> URGENT
                  </span>
                )}

                <span className="text-[9px] font-mono tracking-wider text-white/30 font-bold block uppercase">{notice.category}</span>
                <h4 className="text-sm md:text-base font-extrabold text-white mt-1.5 uppercase leading-relaxed">{notice.title}</h4>
                <p className="text-xs text-white/60 mt-2.5 leading-relaxed font-sans">
                  {notice.description}
                </p>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/35 mt-4 pt-3.5 border-t border-[#262626] flex justify-between items-center">
                  <span>दिनांक: {notice.date}</span>
                  <span className="text-[#FF5200] font-bold">ग्रामसेवक स्वाक्षरी ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Grievance Box (तक्रारी नोंदवा) & Complaints History */}
        <div className="space-y-6" id="grievance-forms-container">
          
          {/* Submittor Form Block */}
          <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold font-display uppercase tracking-tight text-white flex items-center gap-2 pb-3.5 border-b border-[#262626]">
              <ClipboardList className="w-5 h-5 text-[#FF5200]" />
              नवीन तक्रार नोंदवा
            </h3>

            {formSuccess ? (
              <div className="py-6 text-center space-y-4 animate-scale-up" id="complaint-success">
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mx-auto text-xl shadow-lg font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-white uppercase tracking-tight">तक्रार यशस्वी नोंदवण्यात आली!</h4>
                  <p className="text-xs text-white/50 mt-1 font-sans">तुमच्या समस्येबाबत प्रभाग अधिकाऱ्यांकडे तक्रार नोंदवण्यात आली आहे.</p>
                </div>

                <div className="bg-[#1C1C1F] border border-[#262626] p-3 rounded-xl max-w-xs mx-auto text-xs space-y-1 font-mono uppercase tracking-wider">
                  <span>तक्रार क्रमांक: <strong className="text-[#FF5200]">{formSuccess.id}</strong></span>
                  <span className="block text-white/40 text-[10px]">STATUS: प्रलंबित (प्रभाग क्र. २ पडताळणी)</span>
                </div>

                <button 
                  onClick={() => setFormSuccess(null)}
                  className="bg-white hover:bg-neutral-100 text-black text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-lg transition-transform"
                >
                  आणखी एक तक्रार दाखल करा
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitComplaint} className="space-y-4" id="grievance-actual-form">
                <div>
                  <label className="block text-[10px] font-bold text-white/45 uppercase tracking-[0.2em] mb-2 font-mono">तक्रार प्रकार निवडा (Grievance Type)</label>
                  <select 
                    value={complaintType}
                    onChange={(e) => setComplaintType(e.target.value)}
                    className="w-full bg-[#1C1C1F] border border-[#262626] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FF5200] font-sans"
                  >
                    <option value="दिवाबत्ती (Broken Lamps)">दिवाबत्ती (Broken Lamps)</option>
                    <option value="कचरा व्यवस्थापन (Garbage Management)">कचरा व्यवस्थापन (Garbage Management)</option>
                    <option value="रस्ता दुरुस्ती (Road Repair)">रस्ता दुरुस्ती (Road Repair)</option>
                    <option value="पाणी पुरवठा (Water Supply)">पाणी पुरवठा (Water Supply)</option>
                    <option value="इतर (Others)">इतर (Others)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/45 uppercase tracking-[0.2em] mb-2 font-mono">तक्रारीचे सविस्तर वर्णन भरा *</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="समस्येचे अचूक स्थान आणि वर्णन मराठीत किंवा इंग्रजीत लिहा..."
                    value={complaintDesc}
                    onChange={(e) => setComplaintDesc(e.target.value)}
                    className="w-full bg-[#1C1C1F] border border-[#262626] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FF5200]"
                  />
                </div>

                {/* Optional Photo attachment block */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-white/45 uppercase tracking-[0.2em] mb-2 font-mono">तक्रारीचा प्रत्यक्ष फोटो जोडा (पर्यायी)</label>
                  
                  {photoPreview ? (
                    <div className="relative w-24 h-24 rounded-lg bg-[#1C1C1F] overflow-hidden border border-[#262626]">
                      <img src={photoPreview} alt="पुराव्याचा फोटो" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setPhotoPreview(null)}
                        className="absolute top-1.5 right-1.5 bg-black/80 text-white rounded-full p-1 cursor-pointer hover:bg-black"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative border border-dashed border-[#262626] hover:border-[#FF5200]/65 rounded-xl p-4 text-center cursor-pointer transition-colors bg-[#1C1C1F]/40 flex flex-col items-center justify-center group">
                      <Camera className="w-6 h-6 text-white/30 mb-1.5 group-hover:text-white transition-colors" />
                      <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider font-mono">कॅमेरा / गॅलरी फाईल निवडा</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        id="form-complaint-camera"
                      />
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white hover:bg-neutral-100 disabled:bg-[#1C1C1F] disabled:text-white/20 text-black font-black uppercase tracking-wider text-xs py-3 rounded-lg shadow-lg transition-transform text-center cursor-pointer"
                >
                  {loading ? "तक्रार दाखल होत आहे..." : "तक्रार अधिकृतपणे दाखल करा ✍️"}
                </button>
              </form>
            )}
          </div>

          {/* Grievance history list pulled from server complaints API */}
          <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 shadow-sm" id="complaints-history-board">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3.5 font-mono">अगोदर सबमिट केलेल्या तक्रारी ({complaints.length})</h4>
            
            <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1" id="complaints-list">
              {complaints.map((item) => (
                <div key={item.id} className="bg-[#1C1C1F] border border-[#262626] p-4 rounded-xl text-xs space-y-2" id={`complaint-log-${item.id}`}>
                  <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-wider text-white/40">
                    <span className="font-bold text-[#FF5200]">{item.id}</span>
                    <span>{item.date}</span>
                  </div>
                  <strong className="block text-white font-extrabold uppercase tracking-wide">{item.type}</strong>
                  <p className="text-white/60 leading-relaxed font-sans">{item.description}</p>
                  
                  {item.photo && (
                    <div className="w-12 h-12 rounded overflow-hidden mt-1.5 border border-[#262626]">
                      <img src={item.photo} alt="पुरावा" className="w-full h-full object-cover grayscale" />
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-[#262626] mt-2 font-mono uppercase tracking-wider text-[9px]">
                    <span className="text-white/30">विभाग: प्रभाग क्र. २</span>
                    <span className={`px-2.5 py-0.5 rounded-sm font-black text-[9px] border ${
                      item.status === "निवारण" 
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : item.status === "प्रगतीपथावर"
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
