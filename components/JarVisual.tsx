import React from 'react';
import { motion } from 'framer-motion';

interface JarVisualProps {
  colorLeft: string;
  colorRight: string;
  label?: string;
  className?: string;
}

export const JarVisual: React.FC<JarVisualProps> = ({ colorLeft, colorRight, label, className = "w-64 h-80" }) => {
  return (
    <motion.div 
      className={`relative ${className} filter drop-shadow-xl`}
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Lid */}
        <rect x="40" y="0" width="120" height="25" rx="5" fill="#D32F2F" />
        
        {/* Glass Jar Body */}
        <path d="M25 30 H175 C185 30 190 40 190 55 V220 C190 245 170 260 145 260 H55 C30 260 10 245 10 220 V55 C10 40 15 30 25 30 Z" fill="white" stroke="#ddd" strokeWidth="1"/>
        
        {/* Mask for filling */}
        <mask id={`mask-${label?.replace(/\s/g, '')}`}>
          <path d="M25 35 H175 C180 35 185 40 185 55 V220 C185 240 170 255 145 255 H55 C30 255 15 240 15 220 V55 C15 40 20 35 25 35 Z" fill="white"/>
        </mask>

        {/* Left Flavor */}
        <rect x="0" y="0" width="100" height="260" fill={colorLeft} mask={`url(#mask-${label?.replace(/\s/g, '')})`} />
        
        {/* Right Flavor */}
        <rect x="100" y="0" width="100" height="260" fill={colorRight} mask={`url(#mask-${label?.replace(/\s/g, '')})`} />

        {/* Label */}
        <rect x="30" y="80" width="140" height="100" rx="10" fill="white" fillOpacity="0.95" />
        <rect x="35" y="85" width="130" height="90" rx="8" stroke="#D32F2F" strokeWidth="2" fill="none" />
        
        {/* Logo Text Placeholder */}
        <text x="100" y="125" textAnchor="middle" fill="#3E2723" fontFamily="Fredoka, sans-serif" fontWeight="bold" fontSize="24">
          Duo
        </text>
        <text x="100" y="150" textAnchor="middle" fill="#D32F2F" fontFamily="Fredoka, sans-serif" fontWeight="bold" fontSize="18">
          PENOTTI
        </text>
      </svg>
      {label && (
        <div className="absolute -bottom-12 left-0 w-full text-center">
           <h3 className="text-xl font-playful font-bold text-chocolate">{label}</h3>
        </div>
      )}
    </motion.div>
  );
};