import React from 'react';

interface RfdLogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  textColorClass?: string;
  textSubClass?: string;
}

export default function RfdLogo({ 
  className = '', 
  iconSize = 36, 
  showText = true,
  textColorClass = 'text-slate-800',
  textSubClass = 'text-slate-400'
}: RfdLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Dynamic Golden SVG Emblem precisely tracing the uploaded graphic layout */}
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 320 320" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-110"
      >
        {/* Main Large Chevron Peak */}
        <path 
          d="M 140,60 L 260,180 L 220,220 L 140,140 L 60,220 L 20,180 Z" 
          fill="#FFC220" 
          stroke="#FFC220"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Solid Diamond underneath the peak */}
        <path 
          d="M 140,185 L 180,225 L 140,265 L 100,225 Z" 
          fill="#FFC220" 
          stroke="#FFC220"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Smaller chevron roof-block on the upper right side */}
        <path 
          d="M 240,60 L 300,120 L 260,160 L 200,100 Z" 
          fill="#FFC220" 
          stroke="#FFC220"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <div className="flex flex-col text-left leading-none font-sans">
          <div className="flex items-center gap-1">
            <span className={`font-display font-extrabold tracking-tight text-lg ${textColorClass}`}>
              <span className="text-[#FFC220]">RFD</span> GuruPro
            </span>
            <span className="text-[8px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded-full uppercase ml-1 animate-pulse">PRO</span>
          </div>
          <span className={`text-[9px] mt-0.5 ${textSubClass}`}>Sistem Integrasi Admin & Kurikulum AI</span>
        </div>
      )}
    </div>
  );
}
