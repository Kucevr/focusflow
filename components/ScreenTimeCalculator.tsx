import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ScreenTimeCalculator: React.FC = () => {
  const [hours, setHours] = useState(4);
  const { t } = useLanguage();
  
  // Calculate years lost over an 80-year life
  const yearsLost = Math.round((hours / 24) * 80 * 10) / 10;
  
  // Percentage of waking life (assuming 16h waking)
  const wakingPercentage = Math.round((hours / 16) * 100);

  // Dynamic color based on severity
  const getSeverityColor = () => {
      if (hours < 2) return "text-emerald-400";
      if (hours < 5) return "text-yellow-400";
      return "text-rose-500";
  }

  const getGradient = () => {
    if (hours < 2) return "from-emerald-500 to-emerald-900";
    if (hours < 5) return "from-yellow-500 to-orange-600";
    return "from-rose-500 to-red-900";
  }

  return (
    <div className="relative w-full max-w-xl mx-auto group">
      {/* Glow effect behind */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${getGradient()} opacity-20 blur-xl transition-all duration-1000 group-hover:opacity-40`}></div>
      
      <div className="relative p-8 md:p-10 rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
            <div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">{t('problem.calc.header')}</h3>
                <p className="text-xl font-serif-display text-white">{t('problem.calc.daily')}</p>
            </div>
            <div className={`text-4xl font-bold font-mono tracking-tighter transition-colors duration-500 ${getSeverityColor()}`}>
                {hours}h
            </div>
        </div>

        {/* Slider */}
        <div className="mb-12 relative">
            <input 
            type="range" 
            min="0" 
            max="12" 
            step="0.5" 
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="relative z-20 w-full h-12 opacity-0 cursor-pointer"
            />
            {/* Custom Track */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-gray-800 rounded-full overflow-hidden pointer-events-none">
                <div 
                    className={`h-full bg-gradient-to-r ${getGradient()} transition-all duration-300`} 
                    style={{ width: `${(hours / 12) * 100}%` }}
                ></div>
            </div>
            {/* Custom Thumb */}
            <div 
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg pointer-events-none transition-all duration-300"
                style={{ left: `calc(${(hours / 12) * 100}% - 12px)` }}
            >
                <div className={`absolute inset-0 rounded-full animate-ping opacity-20 bg-white`}></div>
            </div>
             <div className="flex justify-between text-[10px] text-gray-600 font-mono mt-4 uppercase tracking-widest">
                <span>{t('problem.calc.monk')}</span>
                <span>{t('problem.calc.average')}</span>
                <span>{t('problem.calc.terminal')}</span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/5">
            <div className="bg-[#111] p-6 text-center hover:bg-[#161616] transition-colors">
                <div className="text-3xl font-bold text-white mb-2 font-serif-display">{yearsLost}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500">{t('problem.calc.yearsLost')}</div>
            </div>
            <div className="bg-[#111] p-6 text-center hover:bg-[#161616] transition-colors">
                <div className={`text-3xl font-bold mb-2 font-serif-display ${getSeverityColor()}`}>{wakingPercentage}%</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500">{t('problem.calc.wakingLife')}</div>
            </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-500 font-serif-display italic">
           {t('problem.calc.quote', { years: yearsLost })}
        </p>
      </div>
    </div>
  );
};

export default ScreenTimeCalculator;