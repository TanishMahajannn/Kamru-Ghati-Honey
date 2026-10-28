import React from 'react';

export interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function BrandLogo({ className = '', showSubtitle = true }: BrandLogoProps) {
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Refined botanical emblem */}
      <svg
        viewBox="0 0 40 28"
        className="w-7 h-5 text-honey-600 mb-1"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Center petal/leaf */}
        <path d="M 20 2 C 17 9 17 19 20 26 C 23 19 23 9 20 2 Z" opacity="0.9" />
        {/* Left leaf */}
        <path d="M 18 12 C 12 11 6 15 3 21 C 9 21 15 18 18 14 Z" opacity="0.75" />
        {/* Right leaf */}
        <path d="M 22 12 C 28 11 34 15 37 21 C 31 21 25 18 22 14 Z" opacity="0.75" />
      </svg>

      {/* Brand Name */}
      <span className="font-serif font-bold text-earth-900 tracking-[0.22em] text-sm sm:text-base uppercase leading-none">
        KAMRU GHATI
      </span>

      {showSubtitle && (
        <span className="text-[9px] font-sans font-medium tracking-[0.24em] text-earth-400 uppercase mt-1">
          PURE BY NATURE • EST. 2020
        </span>
      )}
    </div>
  );
}
