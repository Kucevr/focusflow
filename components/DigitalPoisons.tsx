import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DigitalPoisons: React.FC = () => {
  const { t } = useLanguage();

  const poisons = [
    { id: 'infinite', icon: '♾️' },
    { id: 'variable', icon: '🎰' },
    { id: 'fomo', icon: '🔔' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {poisons.map((p) => (
        <div key={p.id} className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden">
          <div className="absolute -right-4 -top-4 text-6xl opacity-10 group-hover:scale-110 transition-transform duration-500">
            {p.icon}
          </div>
          <div className="relative z-10">
            <div className="text-2xl mb-2">{p.icon}</div>
            <h4 className="text-lg font-bold text-white mb-2">{t(`poisons.${p.id}`)}</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t(`poisons.${p.id}Desc`)}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 w-0 group-hover:w-full transition-all duration-500"></div>
        </div>
      ))}
    </div>
  );
};

export default DigitalPoisons;