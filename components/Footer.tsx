import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { level, experience, completedExercises, unlockedSounds } = useProgress();

  const nextLevelExp = Math.pow(level, 2) * 100;
  const progressToNext = (experience / nextLevelExp) * 100;

  return (
    <footer className="relative z-10 bg-black border-t border-white/10 pt-20 pb-10 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand & Progress */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter font-serif-display mb-4">FocusFlow</h2>
              <p className="text-gray-500 max-w-md leading-relaxed">
                {t('action.footer')}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">{t('progress.level')}</span>
                    <div className="text-3xl font-bold tabular-nums">{level}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">{t('progress.exp')}</span>
                    <div className="text-sm font-medium text-gray-300">{experience} / {nextLevelExp}</div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000"
                    style={{ width: `${progressToNext}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
                  <div className="text-center">
                    <div className="text-xl font-bold">{completedExercises.length}</div>
                    <div className="text-[8px] uppercase tracking-widest text-gray-500">{t('progress.exercises')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{unlockedSounds.length}</div>
                    <div className="text-[8px] uppercase tracking-widest text-gray-500">{t('progress.sounds')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">1</div>
                    <div className="text-[8px] uppercase tracking-widest text-gray-500">{t('progress.themes')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">{t('action.resources')}</h4>
              <ul className="space-y-4">
                {['science', 'tools', 'calculator'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{t(`action.${item}`)}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Legal</h4>
              <ul className="space-y-4">
                {['privacy', 'latency'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{t(`action.${item}`)}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <div className="text-[10px] uppercase tracking-widest text-gray-600 flex flex-wrap justify-center md:justify-start gap-y-2">
            <span>© 2026 FocusFlow. All rights reserved.</span>
            <span className="hidden md:inline mx-3 opacity-30">|</span>
            <span className="w-full md:w-auto">
              Designed & Developed by <a href="https://kutsev-studio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-gray-700 hover:decoration-white">kutsev-studio</a>
            </span>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            Back to Top
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;