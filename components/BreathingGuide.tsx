import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const BreathingGuide: React.FC = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const { t } = useLanguage();

  useEffect(() => {
    const cycle = () => {
      setPhase('Inhale');
      setTimeout(() => {
        setPhase('Hold');
        setTimeout(() => {
          setPhase('Exhale');
        }, 2000); // Hold for 2s
      }, 4000); // Inhale for 4s
    };

    cycle();
    const interval = setInterval(cycle, 10000); // Total cycle 10s (4+2+4)
    return () => clearInterval(interval);
  }, []);

  const getPhaseText = () => {
    switch (phase) {
      case 'Inhale': return t('clarity.guide.inhale');
      case 'Hold': return t('clarity.guide.hold');
      case 'Exhale': return t('clarity.guide.exhale');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Outer Rings */}
        <div className={`absolute inset-0 rounded-full border border-emerald-500/30 transition-all duration-[4000ms] ease-in-out ${phase === 'Inhale' ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`}></div>
        <div className={`absolute inset-4 rounded-full border border-emerald-500/20 transition-all duration-[4000ms] ease-in-out ${phase === 'Inhale' ? 'scale-125 opacity-100' : 'scale-95 opacity-50'}`}></div>
        
        {/* Core Circle */}
        <div className={`w-32 h-32 bg-emerald-500/20 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-[4000ms] ease-in-out shadow-[0_0_50px_rgba(16,185,129,0.3)] ${phase === 'Inhale' ? 'scale-150' : 'scale-100'}`}>
          <span className="text-white font-serif-display text-lg tracking-widest animate-pulse">
            {getPhaseText()}
          </span>
        </div>
      </div>
      <p className="mt-12 text-emerald-500/60 text-xs uppercase tracking-[0.2em] font-medium">
        {t('clarity.guide.sync')}
      </p>
    </div>
  );
};

export default BreathingGuide;