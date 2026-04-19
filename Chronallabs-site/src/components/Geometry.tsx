import React from 'react';
import { GeometryType } from '../types';

interface GeometryProps {
  type: GeometryType;
  className?: string;
  opacity?: number;
  animate?: 'float' | 'rotate' | 'pulse' | 'none';
  parallaxFactor?: number;
  scrollY?: number;
  reactive?: boolean;
  style?: React.CSSProperties;
}

export const Geometry: React.FC<GeometryProps> = ({ 
  type, 
  className = '', 
  opacity = 0.1, 
  animate = 'none',
  parallaxFactor = 0,
  scrollY = 0,
  reactive = true,
  style: extraStyle
}) => {
  const parallaxOffset = scrollY * parallaxFactor;
  const animationClass = 
    animate === 'float' ? 'animate-slow-float' : 
    animate === 'rotate' ? 'animate-slow-rotate' : 
    animate === 'pulse' ? 'animate-pulse' : '';
  
  const reactiveClass = reactive ? `geo-reactive pointer-events-auto cursor-pointer` : 'pointer-events-none';
  const baseStyles = `absolute transition-all duration-1000 ease-out-expo ${animationClass} ${reactiveClass} ${className}`;
  
  const baseStyle: React.CSSProperties = { 
    opacity, 
    transform: parallaxFactor ? `translateY(${parallaxOffset}px)` : undefined 
  };

  const renderShape = () => {
    // Shared class for fill transition on divs using the specific app green (#10b981)
    const divFillClass = "w-full h-full border border-current transition-all duration-1000 group-hover:bg-[#10b981] group-hover:border-[#10b981] group-hover/principle:bg-[#10b981] group-hover/principle:border-[#10b981]";
    // Shared class for fill transition on SVG paths using the specific app green (#10b981)
    const svgPathClass = "transition-all duration-1000 fill-transparent group-hover:fill-[#10b981] group-hover:stroke-[#10b981] group-hover/principle:fill-[#10b981] group-hover/principle:stroke-[#10b981]";

    switch (type) {
      case GeometryType.SQUARE:
        return <div className={divFillClass} />;
      case GeometryType.CIRCLE:
        return <div className={`${divFillClass} rounded-full`} />;
      case GeometryType.TRIANGLE:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <polygon 
              points="50,15 90,85 10,85" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              className={svgPathClass}
            />
          </svg>
        );
      case GeometryType.WAVY:
        return (
          <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,10 Q12.5,0 25,10 T50,10 T75,10 T100,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case GeometryType.CHEVRON:
        return (
          <div className="flex space-x-1 transition-all duration-500">
            {[1, 2, 3, 4].map(i => <span key={i} className="text-2xl font-light leading-none">{'<'}</span>)}
          </div>
        );
      case GeometryType.STAIRCASE:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path 
              d="M10,90 L30,90 L30,70 L50,70 L50,50 L70,50 L70,30 L90,30" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              className={svgPathClass}
            />
          </svg>
        );
      case GeometryType.CUBE:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="currentColor" strokeWidth="1" className={svgPathClass} />
            <path d="M50,10 L90,10 L90,50 L50,50 Z" fill="none" stroke="currentColor" strokeWidth="1" className={svgPathClass} />
            <path d="M30,30 L50,10 M70,30 L90,10 M70,70 L90,50 M30,70 L50,50" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        );
      case GeometryType.CROSS:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50,20 L50,80 M20,50 L80,50" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case GeometryType.DIAMOND:
        return (
          <div className={`${divFillClass} rotate-45`} />
        );
      case GeometryType.STRIPED_CIRCLE:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" className={svgPathClass} />
            <path d="M20,50 L80,50 M50,20 L50,80" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </svg>
        );
      case GeometryType.DOTS:
        return (
          <div className="grid grid-cols-4 gap-4 w-full h-full transition-all duration-1000 group-hover:scale-110">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-current rounded-full transition-all duration-1000 group-hover:bg-[#10b981]" />
            ))}
          </div>
        );
      case GeometryType.LINE:
        return <div className="w-full h-px bg-current" />;
      case GeometryType.SCHEMATIC:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <circle cx="20" cy="20" r="5" fill="currentColor" className="transition-all duration-1000 group-hover:fill-[#10b981]" />
            <circle cx="80" cy="80" r="5" stroke="currentColor" fill="none" className="transition-all duration-1000 group-hover:stroke-[#10b981]" />
            <path d="M20,20 L20,80 L80,80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M20,20 L80,20 L80,80" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <rect x="45" y="45" width="10" height="10" fill="none" stroke="currentColor" className={svgPathClass} />
          </svg>
        );
      default:
        return null;
    }
  };

  const defaultDimensions = {
    [GeometryType.WAVY]: { width: '120px', height: '24px' },
    [GeometryType.CHEVRON]: { width: 'auto', height: 'auto' },
    [GeometryType.CUBE]: { width: '80px', height: '80px' },
    [GeometryType.STAIRCASE]: { width: '100px', height: '100px' },
    [GeometryType.CROSS]: { width: '40px', height: '40px' },
    [GeometryType.STRIPED_CIRCLE]: { width: '100px', height: '100px' },
    [GeometryType.DIAMOND]: { width: '60px', height: '60px' },
    [GeometryType.SQUARE]: { width: '100px', height: '100px' },
    [GeometryType.CIRCLE]: { width: '120px', height: '120px' },
    [GeometryType.TRIANGLE]: { width: '80px', height: '80px' },
    [GeometryType.DOTS]: { width: 'auto', height: 'auto' },
    [GeometryType.LINE]: { width: '200px', height: '1px' },
    [GeometryType.SCHEMATIC]: { width: '150px', height: '150px' },
  }[type];

  const mergedStyle = { ...defaultDimensions, ...baseStyle, ...extraStyle };

  return (
    <div className={baseStyles} style={mergedStyle}>
      {renderShape()}
    </div>
  );
};