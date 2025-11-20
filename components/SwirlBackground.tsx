import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const SwirlBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // The main rotation follows the scroll: 0% scroll = 0deg, 100% scroll = 360deg
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -270]);
  
  // Slight scaling for a "pulsing" or "coming closer" effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  
  // Parallax vertical movement
  const yParallax1 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      {/* Main Container for the spiral effect */}
      <motion.div 
        className="relative w-[150vmax] h-[150vmax] flex items-center justify-center opacity-20 md:opacity-15"
        style={{ rotate, scale }}
      >
        {/* Chocolate Swirl Arm */}
        <svg 
          viewBox="0 0 1000 1000" 
          className="absolute inset-0 w-full h-full"
          style={{ overflow: 'visible' }}
        >
           <defs>
             <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
             </filter>
           </defs>
           {/* Large organic spiral shape 1 */}
           <path
             d="M500,500 C600,300 900,300 900,500 C900,800 200,800 200,500 C200,100 800,100 800,500"
             fill="none"
             stroke="#3E2723"
             strokeWidth="180"
             strokeLinecap="round"
             filter="url(#blurFilter)"
           />
        </svg>

        {/* Vanilla Swirl Arm - Rotates slightly differently for organic mixing feel */}
         <motion.div 
           className="absolute inset-0 w-full h-full flex items-center justify-center"
           style={{ rotate: rotateReverse }}
         >
           <svg viewBox="0 0 1000 1000" className="w-full h-full" style={{ overflow: 'visible' }}>
             {/* Large organic spiral shape 2 */}
             <path
               d="M500,500 C400,700 100,700 100,500 C100,200 800,200 800,500 C800,900 200,900 200,500"
               fill="none"
               stroke="#FFF8E1"
               strokeWidth="180"
               strokeLinecap="round"
               filter="url(#blurFilter)"
             />
           </svg>
         </motion.div>
      </motion.div>
      
      {/* Extra Floating Elements for Depth */}
       <motion.div 
         style={{ y: yParallax1, rotate: rotateReverse }}
         className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] bg-chocolate rounded-full mix-blend-multiply filter blur-[100px] opacity-10"
       />
        <motion.div 
         style={{ y: yParallax2, rotate }}
         className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] bg-vanilla rounded-full mix-blend-overlay filter blur-[80px] opacity-20"
       />
    </div>
  );
};
