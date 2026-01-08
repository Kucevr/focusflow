
import React, { useEffect, useState } from 'react';
import { ScrollPhase } from '../types';

interface VisualOrbProps {
  phase: ScrollPhase;
}

const VisualOrb: React.FC<VisualOrbProps> = ({ phase }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Styles for the primary orb
  const getOrbStyle = () => {
    switch (phase) {
      case ScrollPhase.HERO:
        return "bg-indigo-600 scale-100 opacity-50 translate-y-0 blur-[120px]";
      case ScrollPhase.ALGORITHM:
        // Digital Eye: Green, sharp, pulsing
        return "bg-emerald-500 scale-[1.5] opacity-30 translate-y-0 blur-[40px] animate-pulse";
      case ScrollPhase.DOPAMINE:
        // Candy colored, erratic
        return "bg-pink-500 scale-[2] opacity-60 translate-y-0 blur-[90px] animate-pulse duration-[150ms]";
      case ScrollPhase.BURDEN:
        // Split/High contrast
        return "bg-yellow-500 scale-[1.2] opacity-80 translate-x-[-20%] blur-[20px]";
      case ScrollPhase.PROBLEM:
        return "bg-orange-600 scale-150 opacity-60 translate-y-32 blur-[100px]";
      case ScrollPhase.CHAOS:
        return "bg-rose-700 scale-[2.8] opacity-90 translate-x-0 blur-[60px] animate-pulse duration-[500ms]";
      case ScrollPhase.REWIRING:
        return "bg-cyan-500 scale-110 opacity-30 translate-y-0 blur-[80px]";
      case ScrollPhase.CLARITY:
        return "bg-emerald-500 scale-90 opacity-40 translate-y-[-10%] blur-[120px]";
      case ScrollPhase.MANIFESTO:
        return "bg-white scale-[2] opacity-10 translate-y-20 blur-[100px]";
      case ScrollPhase.RESILIENCE:
        // Focus Beam: Violet, tight, centered
        return "bg-violet-600 scale-75 opacity-80 translate-y-0 blur-[60px]";
      case ScrollPhase.ACTION:
        return "bg-blue-600 scale-125 opacity-30 -translate-y-20 blur-[140px]";
      default:
        return "bg-white";
    }
  };

  // Styles for the secondary orb (adds depth)
  const getSecondaryOrbStyle = () => {
    switch (phase) {
      case ScrollPhase.HERO:
        return "bg-violet-400 translate-x-[20%] translate-y-[20%] opacity-30 blur-[100px]";
      case ScrollPhase.ALGORITHM:
         // Matrix Grid effect backing
        return "bg-green-900 translate-x-0 translate-y-0 opacity-40 blur-[100px]";
      case ScrollPhase.DOPAMINE:
        return "bg-fuchsia-400 translate-x-[10%] -translate-y-[10%] opacity-40 blur-[60px] animate-bounce";
      case ScrollPhase.BURDEN:
        // Conflicting color
        return "bg-blue-600 translate-x-[20%] opacity-80 blur-[30px]";
      case ScrollPhase.PROBLEM:
        return "bg-red-500 -translate-x-[20%] translate-y-10 opacity-50 blur-[120px]";
      case ScrollPhase.CHAOS:
        return "bg-amber-600 translate-x-[-10%] -translate-y-32 opacity-70 blur-[50px] animate-bounce duration-[200ms]";
      case ScrollPhase.REWIRING:
        return "bg-teal-400 translate-x-[20%] translate-y-[-10%] opacity-40 blur-[60px]";
      case ScrollPhase.CLARITY:
        return "bg-teal-300 translate-x-[30%] -translate-y-10 opacity-30 blur-[90px]";
      case ScrollPhase.MANIFESTO:
        return "bg-gray-200 -translate-x-[20%] translate-y-[20%] opacity-10 blur-[80px]";
      case ScrollPhase.RESILIENCE:
        return "bg-fuchsia-600 translate-x-0 translate-y-0 opacity-50 blur-[80px]";
      case ScrollPhase.ACTION:
        return "bg-fuchsia-500 -translate-x-[20%] translate-y-40 opacity-20 blur-[130px]";
      default:
        return "opacity-0";
    }
  };

  // Third orb for rotation/movement
  const getTertiaryOrbStyle = () => {
      switch (phase) {
        case ScrollPhase.HERO:
            return "bg-blue-300 -translate-x-[20%] -translate-y-[20%] opacity-20";
        case ScrollPhase.ALGORITHM:
            // Sharp digital highlight
            return "bg-green-400 translate-x-0 translate-y-0 opacity-20 mix-blend-color-dodge blur-[30px]";
        case ScrollPhase.DOPAMINE:
            return "bg-yellow-300 translate-x-0 translate-y-0 opacity-40 mix-blend-hard-light blur-[40px]";
        case ScrollPhase.BURDEN:
            return "bg-red-500 translate-y-20 opacity-40 mix-blend-difference blur-[50px]";
        case ScrollPhase.CHAOS:
            return "bg-white translate-x-0 translate-y-0 opacity-20 mix-blend-overlay";
        case ScrollPhase.REWIRING:
            return "bg-indigo-400 translate-x-[-10%] translate-y-[10%] opacity-30 mix-blend-screen";
        case ScrollPhase.RESILIENCE:
            return "bg-purple-400 translate-x-0 translate-y-0 opacity-30 mix-blend-overlay";
        default:
            return "opacity-0";
      }
  }

  // Parallax transform calculation
  const parallaxX = mousePos.x * 20; // 20px movement
  const parallaxY = mousePos.y * 20;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden bg-[#050505] transition-colors duration-1000">
      {/* Container for rotation effect + Parallax */}
      <div 
        className="relative w-full h-full animate-[spin_60s_linear_infinite]"
        style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}
      >
          {/* Primary Orb */}
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full transition-all duration-[2000ms] cubic-bezier(0.4, 0, 0.2, 1) ${getOrbStyle()}`}
          />
          
          {/* Secondary Orb */}
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full transition-all duration-[2500ms] cubic-bezier(0.4, 0, 0.2, 1) ${getSecondaryOrbStyle()}`}
            style={{ transform: `translate(calc(-50% + ${-parallaxX * 2}px), calc(-50% + ${-parallaxY * 2}px))` }} 
          />

           {/* Tertiary Orb */}
           <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full blur-[80px] transition-all duration-[3000ms] ${getTertiaryOrbStyle()}`}
          />
      </div>

      {/* Special Overlay for Algorithm Phase (Scan lines) */}
      <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transition-opacity duration-1000 ${phase === ScrollPhase.CHAOS || phase === ScrollPhase.BURDEN ? 'opacity-50 contrast-200' : 'opacity-20'} brightness-100 mix-blend-overlay pointer-events-none`}></div>
      
      {/* Scan lines for Algorithm */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none transition-opacity duration-700 ${phase === ScrollPhase.ALGORITHM ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80 pointer-events-none"></div>
    </div>
  );
};

export default VisualOrb;
