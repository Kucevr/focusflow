import React from 'react';
import { ScrollPhase } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SideNavProps {
  currentPhase: ScrollPhase;
  onNavigate: (phase: ScrollPhase) => void;
}

const SideNav: React.FC<SideNavProps> = ({ currentPhase, onNavigate }) => {
  const { t } = useLanguage();

  const PHASES = [
    { id: ScrollPhase.HERO, label: t('nav.start') },
    { id: ScrollPhase.ALGORITHM, label: t('nav.algorithm') },
    { id: ScrollPhase.DOPAMINE, label: t('nav.trap') },
    { id: ScrollPhase.BURDEN, label: t('nav.burden') },
    { id: ScrollPhase.PROBLEM, label: t('nav.problem') },
    { id: ScrollPhase.CHAOS, label: t('nav.chaos') },
    { id: ScrollPhase.REWIRING, label: t('nav.rewiring') },
    { id: ScrollPhase.CLARITY, label: t('nav.clarity') },
    { id: ScrollPhase.MANIFESTO, label: t('nav.manifesto') },
    { id: ScrollPhase.RESILIENCE, label: t('nav.test') },
    { id: ScrollPhase.ACTION, label: t('nav.action') },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {PHASES.map((phase) => (
        <button
          key={phase.id}
          onClick={() => {
              const el = document.getElementById(`section-${phase.id}`);
              el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative flex items-center justify-end"
        >
          <span 
            className={`absolute right-8 text-[10px] uppercase tracking-widest font-medium transition-all duration-300 ${
              currentPhase === phase.id ? 'opacity-100 translate-x-0 text-white' : 'opacity-0 translate-x-2 text-gray-500'
            }`}
          >
            {phase.label}
          </span>
          <div 
            className={`w-2 h-2 rounded-full transition-all duration-300 border ${
              currentPhase === phase.id 
                ? 'bg-white border-white scale-125' 
                : 'bg-transparent border-white/30 hover:border-white hover:bg-white/50'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default SideNav;