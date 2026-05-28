import React from "react";

interface EmblemLogoProps {
  className?: string;
  size?: number;
}

export default function EmblemLogo({ className = "", size = 64 }: EmblemLogoProps) {
  // SVG Text circles are highly responsive and look incredibly professional.
  // We recreate the golden/purple and red detailed seal of:
  // "सांघिक ऐक्य व अभिमानातुन आदर्शगाव" (Top)
  // "ग्रुप ग्रामपंचायत केर-भेकुर्ली ता. दोडामार्ग, जि. सिंधुदुर्ग" (Bottom)
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      id="grampanchayat-emblem"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top text path - goes clockwise from left to right */}
          <path
            id="textPathTop"
            d="M 25 100 A 75 75 0 0 1 175 100"
            fill="none"
          />
          {/* Bottom text path - goes clockwise from left to right but inverted so it's readable */}
          <path
            id="textPathBottom"
            d="M 178 102 A 78 78 0 0 1 22 102"
            fill="none"
          />
          {/* Subtle drop shadow and inner mask if needed */}
          <radialGradient id="deityGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="70%" stopColor="#FFA000" />
            <stop offset="100%" stopColor="#E65100" />
          </radialGradient>
        </defs>

        {/* 1. Base Outer background */}
        <circle cx="100" cy="100" r="96" fill="#FDF8FD" stroke="#6A1B9A" strokeWidth="2" />
        
        {/* 2. Top Banner Ring (Deep Purple Color) */}
        <path
          d="M 12 100 A 88 88 0 1 1 188 100 L 172 100 A 72 72 0 1 0 28 100 Z"
          fill="#6A1B9A"
        />

        {/* 3. Bottom Banner Ring (Vibrant Saffron/Red) */}
        <path
          d="M 12 100 A 88 88 0 0 0 188 100 L 172 100 A 72 72 0 0 1 28 100 Z"
          fill="#E53935"
        />

        {/* 4. Separator Line and Dotted Interior */}
        <circle cx="100" cy="100" r="71" fill="none" stroke="#FFD600" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="69" fill="none" stroke="#6A1B9A" strokeWidth="1" strokeDasharray="3,3" />

        {/* 5. Gold Stars on left and right borders between top and bottom sections */}
        <g fill="#FFD600">
          {/* Left Star */}
          <path d="M 16 100 L 20 97 L 24 100 L 22 104 L 18 104 Z" />
          {/* Right Star */}
          <path d="M 176 100 L 180 97 L 184 100 L 182 104 L 178 104 Z" />
        </g>

        {/* 6. Text Elements using SVG textPath */}
        {/* Top Text (Marathi slogan) */}
        <text fill="#ffffff" fontSize="10.5" fontWeight="700" letterSpacing="0.8" className="select-none font-sans">
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            सांघिक ऐक्य व अभिमानातुन आदर्शगाव
          </textPath>
        </text>

        {/* Bottom Text (Grampanchayat address) */}
        <text fill="#ffffff" fontSize="8" fontWeight="700" letterSpacing="0.5" className="select-none font-sans">
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            ग्रुप ग्रामपंचायत केर-भेकुर्ली, ता. दोडा मार्ग, जि. सिंधुदुर्ग
          </textPath>
        </text>

        {/* 7. Inner Circle with Goddess / Shrine illustration representing "Sateri Devi" */}
        <circle cx="100" cy="100" r="56" fill="#F3E5F5" />
        <circle cx="100" cy="100" r="54" fill="none" stroke="#FFD600" strokeWidth="1" />
        
        {/* Artistic depiction of Sateri Devi draped in majestic red saree with gold ornaments & flower garlands */}
        <g id="deity-artwork">
          {/* Background aura halo */}
          <circle cx="100" cy="85" r="24" fill="url(#deityGold)" opacity="0.8" />
          <circle cx="100" cy="85" r="22" fill="none" stroke="#FFD600" strokeWidth="1" strokeDasharray="2,2" />

          {/* Draped Saree Base structure */}
          {/* Left drape */}
          <path d="M 68 140 Q 64 125 76 96 Q 84 96 100 90 Q 116 96 124 96 Q 136 125 132 140 Z" fill="#D32F2F" />
          {/* Center radiating pleats of the saree draped neatly like in the picture */}
          <path d="M 72 138 C 76 112 84 110 100 110 C 116 110 124 112 128 138 Z" fill="#B71C1C" />
          
          <path d="M 78 139 C 82 118 88 116 100 116 C 112 116 118 118 122 139 Z" fill="#D32F2F" />
          <path d="M 85 140 C 88 124 92 122 100 122 C 108 122 112 124 115 140 Z" fill="#E53935" />
          <path d="M 92 140 C 94 130 96 128 100 128 C 104 128 106 130 108 140 Z" fill="#FF8A80" />
          
          {/* Golden borders of saree */}
          <path d="M 69 139 Q 74 115 100 110 Q 126 115 131 139 L 129 140 Q 124 116 100 112 Q 76 116 71 140 Z" fill="#FFD600" />
          
          {/* Deity Face - Elegant golden representation */}
          <circle cx="100" cy="82" r="11" fill="#FFD54F" stroke="#F57F17" strokeWidth="1" />
          {/* Crown (Mukut) */}
          <path d="M 91 76 L 100 58 L 109 76 L 100 73 Z" fill="#FFD600" stroke="#FF8F00" strokeWidth="1" />
          {/* Red bindi */}
          <circle cx="100" cy="81" r="1.5" fill="#B71C1C" />
          {/* Crown details */}
          <circle cx="100" cy="65" r="2" fill="#E53935" />
          
          {/* Gold Necklaces & Ornaments */}
          <path d="M 91 88 A 10 10 0 0 0 109 88" fill="none" stroke="#FFD600" strokeWidth="2" />
          <path d="M 88 92 A 14 14 0 0 0 112 92" fill="none" stroke="#FFD600" strokeWidth="1.5" />
          <path d="M 85 96 A 18 18 0 0 0 115 96" fill="none" stroke="#FFD600" strokeWidth="2.5" />
          {/* Center green pendant (mangalsutra/jewel) */}
          <circle cx="100" cy="98" r="2.5" fill="#4CAF50" stroke="#FFD600" strokeWidth="0.5" />

          {/* White flower garlands (Shela / Prasadi pushpahara) on the shoulder */}
          {/* Left flower garland drapes down */}
          <path d="M 86 85 Q 73 110 86 132" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeDasharray="1,5" />
          <path d="M 86 85 Q 73 110 86 132" fill="none" stroke="#ECEFF1" strokeWidth="3" strokeLinecap="round" strokeDasharray="1,4.5" />

          {/* Right flower garland drapes down */}
          <path d="M 114 85 Q 127 110 114 132" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeDasharray="1,5" />
          <path d="M 114 85 Q 127 110 114 132" fill="none" stroke="#ECEFF1" strokeWidth="3" strokeLinecap="round" strokeDasharray="1,4.5" />

          {/* Center smaller garland drapes */}
          <path d="M 94 88 Q 88 112 100 125 Q 112 112 106 88" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeDasharray="1,4" />
          {/* Orange marigold details at bottom of central garland */}
          <circle cx="100" cy="126" r="3.5" fill="#FF6D00" />
          <circle cx="100" cy="129" r="2.5" fill="#FFD600" />
          <circle cx="97" cy="127" r="1.5" fill="#4CAF50" />
          <circle cx="103" cy="127" r="1.5" fill="#4CAF50" />
        </g>
      </svg>
    </div>
  );
}
