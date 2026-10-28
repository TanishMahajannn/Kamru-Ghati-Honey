import React from 'react';
import { Truck } from 'lucide-react';
import { Dictionary } from '@/i18n/getDictionary';

export function AnnouncementBar({ dict }: { dict: Dictionary }) {
  return (
    <aside aria-label="Business Announcement" className="bg-forest-900 text-cream-100 text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center font-medium">
        <Truck className="w-3.5 h-3.5 text-honey-400 flex-shrink-0" aria-hidden="true" />
        <span>{dict.announcement.text}</span>
      </div>
    </aside>
  );
}
