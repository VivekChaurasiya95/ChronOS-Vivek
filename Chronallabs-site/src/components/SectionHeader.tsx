
import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title }) => {
  return (
    <div className="flex flex-col mb-16 md:mb-24">
      <span className="text-[10px] tracking-[0.2em] font-medium text-gray-400 mb-4">
        SECTION {number}
      </span>
      <h2 className="text-4xl md:text-6xl font-light tracking-tight border-b border-gray-100 pb-8">
        {title}
      </h2>
    </div>
  );
};
