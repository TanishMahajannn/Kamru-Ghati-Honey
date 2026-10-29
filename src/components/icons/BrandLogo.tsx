import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}

export function BrandLogo({
  className = '',
  showSubtitle = true,
  showText = true,
  size = 'md',
  priority = true,
}: BrandLogoProps) {
  const sizeConfig = {
    sm: {
      dimension: 36,
      imgClass: 'w-9 h-9',
      titleClass: 'text-sm tracking-[0.16em]',
      subClass: 'text-[8px] tracking-[0.2em]',
      gapClass: 'gap-2',
    },
    md: {
      dimension: 48,
      imgClass: 'w-11 h-11 sm:w-12 sm:h-12',
      titleClass: 'text-sm sm:text-base tracking-[0.18em]',
      subClass: 'text-[9px] tracking-[0.22em]',
      gapClass: 'gap-2.5 sm:gap-3',
    },
    lg: {
      dimension: 64,
      imgClass: 'w-14 h-14 sm:w-16 sm:h-16',
      titleClass: 'text-base sm:text-lg tracking-[0.2em]',
      subClass: 'text-[10px] tracking-[0.24em]',
      gapClass: 'gap-3.5',
    },
  }[size];

  return (
    <div className={cn('flex items-center select-none', sizeConfig.gapClass, className)}>
      {/* Brand Logo Seal (Logo.png) */}
      <div className={cn('relative flex-shrink-0', sizeConfig.imgClass)}>
        <Image
          src="/images/brand/logo.png"
          alt="Kamru Ghati Honey"
          width={sizeConfig.dimension}
          height={sizeConfig.dimension}
          className="w-full h-full object-contain rounded-full shadow-2xs"
          priority={priority}
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className={cn('font-serif font-bold text-earth-900 uppercase leading-none', sizeConfig.titleClass)}>
            KAMRU GHATI
          </span>

          {showSubtitle && (
            <span className={cn('font-sans font-medium text-earth-500 uppercase mt-1 leading-none', sizeConfig.subClass)}>
              PURE RAW HONEY • EST. 2020
            </span>
          )}
        </div>
      )}
    </div>
  );
}
