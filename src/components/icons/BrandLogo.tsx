import React from 'react';

export interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function BrandLogo({ className = 'h-10 w-auto', showSubtitle = true }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Emblem SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Hexagon Border */}
        <polygon
          points="50,6 90,28 90,72 50,94 10,72 10,28"
          fill="#F8F3E8"
          stroke="#D9A441"
          strokeWidth="3.5"
        />
        <polygon
          points="50,13 83,31 83,69 50,87 17,69 17,31"
          fill="#FFFFFF"
          stroke="#254D38"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        {/* Mountain peaks */}
        <path d="M22,70 L40,42 L52,58 L65,36 L78,70 Z" fill="#254D38" />
        <path d="M40,42 L46,50 L34,50 Z" fill="#F8F3E8" opacity="0.8" />
        <path d="M65,36 L71,46 L59,46 Z" fill="#F8F3E8" opacity="0.8" />
        {/* Honey drop/sun */}
        <circle cx="50" cy="29" r="6" fill="#D9A441" />
        {/* Little Honey Bee */}
        <ellipse cx="50" cy="62" rx="5.5" ry="3.5" fill="#D9A441" />
        <ellipse cx="46" cy="58" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.9" transform="rotate(-30 46 58)" />
        <ellipse cx="54" cy="58" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.9" transform="rotate(30 54 58)" />
      </svg>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="font-serif font-bold text-forest-700 tracking-wider text-base md:text-lg leading-tight">
          KAMRU GHATI
        </span>
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-honey-600 font-bold tracking-widest text-xs uppercase">
            HONEY
          </span>
          {showSubtitle && (
            <span className="text-[10px] text-earth-700/80 font-medium tracking-tight">
              • EST. 2020 • MANDI
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
