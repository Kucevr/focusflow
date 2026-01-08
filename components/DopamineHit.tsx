import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DopamineHit: React.FC = () => {
  const [level, setLevel] = useState(50);
  const [clicks, setClicks] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();
  
  // Decay mechanism
  useEffect(() => {
    const interval = setInterval(() => {
      setLevel((prev) => {
        const decay = 2 + (clicks * 0.1); // Decay gets faster the more you've played
        return Math.max(0, prev - decay);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [clicks]);

  // Particle System for click effect
  const spawnParticles = (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  };

  const handleClick = (e: React.MouseEvent) => {
    setLevel((prev) => Math.min(100, prev + 15));
    setClicks(c => c + 1);
    
    // Create floating "+1" visual
    const btn = e.currentTarget as HTMLButtonElement;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add visual flare (simple DOM manipulation for demo)
    const flare = document.createElement('div');
    flare.className = 'absolute w-4 h-4 bg-white rounded-full pointer-events-none animate-ping';
    flare.style.left = `${x}px`;
    flare.style.top = `${y}px`;
    btn.appendChild(flare);
    setTimeout(() => flare.remove(), 1000);
  };

  const getStatusText = () => {
      if (clicks < 5) return t('dopamine.tap');
      if (level > 80) return t('dopamine.good');
      if (level > 40) return t('dopamine.chasing');
      if (level > 0) return t('dopamine.dontStop');
      return t('dopamine.withdrawal');
  };

  return (
    <div className="relative w-full max-w-md mx-auto text-center">
        
        <div className="mb-12 space-y-4">
             <div className="inline-block px-3 py-1 border border-pink-500/30 rounded-full text-pink-400 text-[10px] uppercase tracking-widest animate-pulse">
                {t('dopamine.badge')}
              </div>
            <h2 className="text-4xl md:text-6xl font-bold font-serif-display text-white">
                {t('dopamine.title')} <span className="text-pink-500 italic">{t('dopamine.titleHighlight')}</span>
            </h2>
             <p className="text-gray-400 text-sm max-w-xs mx-auto">
                {t('dopamine.subtitle')}
            </p>
        </div>

        {/* The Game */}
        <div className="relative p-10 bg-black/50 border border-pink-500/20 rounded-3xl backdrop-blur-xl shadow-[0_0_50px_rgba(236,72,153,0.1)]">
            
            {/* Meter */}
            <div className="w-full h-4 bg-gray-800 rounded-full mb-8 overflow-hidden relative">
                <div 
                    className={`h-full transition-all duration-100 ease-linear ${level > 80 ? 'bg-white shadow-[0_0_20px_white]' : 'bg-pink-600'}`}
                    style={{ width: `${level}%` }}
                ></div>
            </div>

            {/* Interaction */}
            <button
                onMouseDown={handleClick}
                className={`relative group w-32 h-32 rounded-full transition-all duration-75 active:scale-90 flex items-center justify-center border-4 ${level === 0 ? 'border-gray-700 bg-gray-900 grayscale' : 'border-pink-500 bg-pink-600 hover:bg-pink-500 hover:shadow-[0_0_50px_rgba(236,72,153,0.6)] shadow-[0_0_30px_rgba(236,72,153,0.3)]'}`}
            >
                <span className="text-2xl font-bold text-white pointer-events-none select-none">
                    {level === 0 ? t('dopamine.empty') : t('dopamine.hitMe')}
                </span>
            </button>

            <div className="mt-8 h-8">
                 <p className={`text-xs uppercase tracking-[0.3em] font-bold transition-colors ${level < 30 ? 'text-red-500 animate-pulse' : 'text-pink-300'}`}>
                    {getStatusText()}
                 </p>
            </div>
        </div>

        {clicks > 15 && (
            <div className="mt-12 animate-fade-in-up">
                 <p className="text-xl font-serif-display italic text-gray-300 whitespace-pre-line">
                    {t('dopamine.quote')}
                 </p>
            </div>
        )}
    </div>
  );
};

export default DopamineHit;