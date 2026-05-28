import React, { useState } from "react";
import { galleryData } from "../data";
import { Eye, Heart, Calendar, X } from "lucide-react";

export default function GallerySection() {
  const [filter, setFilter] = useState<"all" | "work" | "agri" | "nature" | "cultural">("all");
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const [activePhoto, setActivePhoto] = useState<any | null>(null);

  const filteredGallery = galleryData.filter(item => {
    if (filter === "all") return true;
    if (filter === "agri" || filter === "nature") {
      return item.category === "agri" || item.category === "nature";
    }
    return item.category === filter;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in text-white" id="gallery-section">
      
      {/* 1. Header */}
      <div id="gallery-header-container" className="border-b border-[#262626] pb-4">
        <h2 className="text-xl md:text-2xl font-black font-display text-white uppercase tracking-tight">छायाचित्र दालन (Village Gallery)</h2>
        <p className="text-xs text-white/50 mt-1">
          केर-भेकुर्ली ग्रामपंचायतीमधील विविध विकास कामे, कृषी शेती आणि सांस्कृतिक उत्सवांची अधिकृत क्षणचित्रे पाहा.
        </p>
      </div>

      {/* 2. Category selection filters */}
      <div className="flex flex-wrap gap-2 border-[#262626] pb-3" id="gallery-filters-row">
        <button 
          onClick={() => setFilter("all")}
          className={`text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
            filter === "all" ? "bg-white text-black font-black" : "bg-[#1C1C1F] hover:bg-[#262626] border border-[#262626] text-white/60 hover:text-white"
          }`}
        >
          📂 सर्व छायाचित्रे
        </button>
        <button 
          onClick={() => setFilter("work")}
          className={`text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
            filter === "work" ? "bg-white text-black font-black" : "bg-[#1C1C1F] hover:bg-[#262626] border border-[#262626] text-white/60 hover:text-white"
          }`}
        >
          🏗️ विकास कामे
        </button>
        <button 
          onClick={() => setFilter("agri")} // Combines agri & nature (कृषी व निसर्ग)
          className={`text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
            filter === "agri" ? "bg-white text-black font-black" : "bg-[#1C1C1F] hover:bg-[#262626] border border-[#262626] text-white/60 hover:text-white"
          }`}
        >
          🌾 कृषी व निसर्ग
        </button>
        <button 
          onClick={() => setFilter("cultural")}
          className={`text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
            filter === "cultural" ? "bg-white text-black font-black" : "bg-[#1C1C1F] hover:bg-[#262626] border border-[#262626] text-white/60 hover:text-white"
          }`}
        >
          🌸 सांस्कृतिक उत्सव
        </button>
      </div>

      {/* 3. Photos Grid layout columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="gallery-photos-grid">
        {filteredGallery.map((item) => (
          <div 
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="bg-[#121212] border border-[#262626] rounded-2xl overflow-hidden shadow-md hover:border-[#262626]/80 transition-all group cursor-zoom-in"
            id={`gallery-item-${item.id}`}
          >
            {/* Image box panel component in framework guidelines */}
            <div className="relative h-44 overflow-hidden bg-neutral-900 border-b border-[#262626]">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
                <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#FF5200]" /> Zoom Picture
                </span>
              </div>
            </div>

            {/* Description panel */}
            <div className="p-4.5 space-y-2.5 text-xs font-sans">
              <div className="flex justify-between items-center text-[10px] text-white/40 font-mono tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> २०२६
                </span>
                <span className="bg-[#FF5200]/10 border border-[#FF5200]/25 text-[#FF5200] font-bold px-2 py-0.5 rounded uppercase">
                  {item.category === "work" ? "विकास" : item.category === "agri" ? "शेती" : item.category === "nature" ? "निसर्ग" : "उत्सव"}
                </span>
              </div>
              <h4 className="font-extrabold text-white group-hover:text-[#FF5200] transition-colors line-clamp-1 uppercase tracking-wide text-sm">{item.title}</h4>
              <p className="text-white/60 line-clamp-2 leading-relaxed font-sans">{item.description}</p>
              
              <div className="pt-3 border-t border-[#262626] flex justify-between items-center text-[9px] font-mono uppercase tracking-wider text-white/30">
                <span>केर-भेकुर्ली</span>
                <button 
                  onClick={(e) => handleLike(item.id, e)}
                  className="flex items-center gap-1.5 text-[10px] hover:text-[#FF5200] font-black transition-colors cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${likedItems[item.id] ? "fill-[#FF5200] text-[#FF5200]" : "text-white/30"}`} />
                  <span>{likedItems[item.id] ? "पसंत केले" : "पसंत करा"}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULL SCREEN ZOOM PHOTO MODAL */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in"
          id="gallery-zoom-modal"
        >
          <div className="bg-[#121212] border border-[#262626] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-scale-up" onClick={e => e.stopPropagation()}>
            <div className="h-64 md:h-96 w-full bg-black relative">
              <img src={activePhoto.imageUrl} alt={activePhoto.title} className="w-full h-full object-contain" />
              <button 
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 bg-black/60 border border-white/10 text-white p-2.5 rounded-full hover:bg-black transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5.5 space-y-3">
              <span className="bg-[#FF5200]/10 border border-[#FF5200]/25 text-[#FF5200] text-[9px] uppercase tracking-widest font-mono font-black px-3 py-1 rounded">
                {activePhoto.category === "work" ? "विकास कामे" : activePhoto.category === "agri" ? "कृषी" : "सांस्कृतिक उत्सव"}
              </span>
              <h3 className="font-extrabold font-display text-white text-base md:text-lg uppercase mt-1">{activePhoto.title}</h3>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed font-sans">{activePhoto.description}</p>
              <div className="pt-4 border-t border-[#262626] flex justify-between text-[11px] text-white/30 font-mono uppercase tracking-wider">
                <span>केर-भेकुर्ली ग्रामपंचायत • अधिकृत प्रसिद्धी</span>
                <span>तारीख: मान्सून २०२६</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
