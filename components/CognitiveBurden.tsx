import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

type ColorType = 'red' | 'blue' | 'green' | 'yellow';

const CognitiveBurden: React.FC = () => {
  const { t } = useLanguage();
  const [gameState, setGameState] = useState<'start' | 'playing' | 'over'>('start');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(100);
  const [currentWord, setCurrentWord] = useState<{ text: string, color: ColorType, value: ColorType }>({ text: 'RED', color: 'blue', value: 'blue' });
  
  const COLORS: ColorType[] = ['red', 'blue', 'green', 'yellow'];

  const generateRound = useCallback(() => {
    // Generate new word
    const textIdx = Math.floor(Math.random() * 4);
    const colorIdx = Math.floor(Math.random() * 4);
    
    // Ensure complexity: Text shouldn't ideally match color often
    const text = COLORS[textIdx];
    const color = COLORS[colorIdx];
    
    setCurrentWord({
        text: t(`burden.game.colors.${text}`),
        color: color,
        value: color // The user must identify the COLOR, not the word
    });
    
    // Reset timer partially based on score (gets faster)
    setTimer(100);
  }, [COLORS, t]);

  useEffect(() => {
    let interval: number;
    if (gameState === 'playing') {
      interval = window.setInterval(() => {
        setTimer(prev => {
          const decay = 1 + (score * 0.1); // Speed up
          if (prev <= 0) {
            setGameState('over');
            return 0;
          }
          return prev - decay;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [gameState, score]);

  const handleStart = () => {
    setScore(0);
    setGameState('playing');
    generateRound();
  };

  const handleChoice = (choice: ColorType) => {
    if (choice === currentWord.value) {
      setScore(s => s + 1);
      generateRound();
    } else {
      // Penalty
      setTimer(t => Math.max(0, t - 30));
      // Visual feedback could go here
    }
  };

  const getColorClass = (c: ColorType) => {
      switch(c) {
          case 'red': return 'text-red-500';
          case 'blue': return 'text-blue-500';
          case 'green': return 'text-green-500';
          case 'yellow': return 'text-yellow-400';
          default: return 'text-white';
      }
  };

  const getButtonColorClass = (c: ColorType) => {
      switch(c) {
          case 'red': return 'hover:bg-red-500/20 border-red-500/50 text-red-400';
          case 'blue': return 'hover:bg-blue-500/20 border-blue-500/50 text-blue-400';
          case 'green': return 'hover:bg-green-500/20 border-green-500/50 text-green-400';
          case 'yellow': return 'hover:bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 relative">
        <div className="text-center mb-12 space-y-4">
             <div className="inline-block px-3 py-1 border border-yellow-500/30 bg-yellow-900/10 rounded-full text-yellow-400 text-[10px] uppercase tracking-widest mb-2">
                {t('burden.badge')}
             </div>
             <h2 className="text-4xl md:text-6xl font-bold font-serif-display text-white">
                {t('burden.title')} <span className="text-yellow-500 italic">{t('burden.titleHighlight')}</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                {t('burden.desc')}
            </p>
        </div>

        <div className="relative bg-black/50 border border-white/10 backdrop-blur-xl rounded-3xl p-10 min-h-[400px] flex flex-col items-center justify-center overflow-hidden shadow-2xl">
            
            {gameState === 'start' && (
                <div className="text-center space-y-6 animate-fade-in-up">
                    <p className="text-xl font-bold text-white">{t('burden.game.instruction')}</p>
                    <button 
                        onClick={handleStart}
                        className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                    >
                        {t('burden.game.start')}
                    </button>
                </div>
            )}

            {gameState === 'playing' && (
                <div className="w-full flex flex-col items-center gap-12">
                    {/* Score & Timer */}
                    <div className="w-full flex justify-between items-center text-xs font-mono uppercase text-gray-500">
                        <span>{t('burden.game.score')}: {score}</span>
                        <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-50 linear ${timer < 30 ? 'bg-red-500' : 'bg-white'}`} 
                                style={{ width: `${timer}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* The Stimulus */}
                    <div className="relative">
                        <h3 className={`text-7xl md:text-8xl font-black tracking-tighter transition-all duration-75 select-none ${getColorClass(currentWord.color)}`}>
                            {currentWord.text}
                        </h3>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                        {COLORS.map((c) => (
                            <button
                                key={c}
                                onClick={() => handleChoice(c)}
                                className={`py-4 border rounded-xl font-bold uppercase tracking-widest transition-all active:scale-95 ${getButtonColorClass(c)}`}
                            >
                                {t(`burden.game.colors.${c}`)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {gameState === 'over' && (
                <div className="text-center space-y-6 animate-shake">
                    <h3 className="text-red-500 font-mono text-xl uppercase tracking-widest mb-2">{t('burden.game.gameOver')}</h3>
                    <div className="text-6xl font-bold text-white mb-4">{score}</div>
                    <button 
                        onClick={handleStart}
                        className="px-8 py-3 border border-white/20 hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest rounded-full transition-all"
                    >
                        {t('burden.game.tryAgain')}
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

export default CognitiveBurden;