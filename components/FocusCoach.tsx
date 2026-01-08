import React, { useState } from 'react';
import { getFocusAdvice } from '../services/geminiService';
import { FocusAdvice } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface FocusCoachProps {
  onStartSession: (advice: string) => void;
}

const FocusCoach: React.FC<FocusCoachProps> = ({ onStartSession }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<FocusAdvice | null>(null);
  const { language, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    const result = await getFocusAdvice(input, language);
    setAdvice(result);
    setLoading(false);
  };

  const handleStart = () => {
    if (advice) {
      onStartSession(advice.action);
    }
  };

  const reset = () => {
    setAdvice(null);
    setInput('');
  };

  if (advice) {
    return (
      <div className="w-full max-w-md mx-auto animate-fade-in-up">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/10 to-black border border-white/20 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600"></div>
          
          <div className="p-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-6 ring-1 ring-emerald-500/50">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">{t('coach.strategy')}</h3>
            
            <div className="mb-8">
              <p className="text-3xl font-serif-display italic text-white leading-tight mb-6">"{advice.mantra}"</p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{t('coach.action')}</h4>
              <p className="text-lg font-medium text-white/90">{advice.action}</p>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={reset}
                className="flex-1 py-3 px-4 rounded-full border border-white/20 hover:bg-white/5 text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                {t('coach.newTopic')}
              </button>
              <button 
                onClick={handleStart}
                className="flex-1 py-3 px-4 rounded-full bg-white hover:bg-gray-200 text-black transition-colors text-xs font-bold uppercase tracking-widest"
              >
                {t('coach.lockIn')}
              </button>
            </div>
          </div>
          
          {/* Decorative background glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-[#0A0A0A] rounded-xl p-1.5 border border-white/10 focus-within:border-white/30 transition-colors">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('coach.placeholder')}
              className="w-full bg-transparent text-white px-4 py-4 rounded-lg focus:outline-none placeholder-neutral-600 text-lg font-light"
              disabled={loading}
              autoComplete="off"
            />
            <button 
              type="submit"
              disabled={loading || !input}
              className="absolute right-2 p-3 bg-white hover:bg-gray-200 rounded-lg transition-all disabled:opacity-50 disabled:bg-gray-800 disabled:text-gray-500 text-black"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              ) : (
                <svg className="h-5 w-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </form>
      <p className="mt-6 text-center text-neutral-500 text-xs tracking-widest uppercase">
        {t('coach.footer')}
      </p>
    </div>
  );
};

export default FocusCoach;