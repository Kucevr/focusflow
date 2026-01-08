import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';
import { translations } from '../utils/translations';

const ResilienceTest: React.FC = () => {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [failed, setFailed] = useState(false);
  const [shake, setShake] = useState(0);
  const [distractions, setDistractions] = useState<{id: number, x: number, y: number, text: string, type: string, scale: number, offset: {x: number, y: number}}[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const timerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { t, language } = useLanguage();
  const { completeExercise } = useProgress();
  const DISTRACTION_TEXTS = translations[language].resilience.distractions;

  // Cleanup audio on unmount
  useEffect(() => {
    return () => stopAudio();
  }, []);

  // Mouse tracking for micro-interactions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setMousePos({ x, y });
        }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Repulsion logic for distractions
  useEffect(() => {
    if (holding) {
        const interval = setInterval(() => {
            setDistractions(prev => prev.map(d => {
                const dx = mousePos.x - d.x;
                const dy = mousePos.y - d.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 15) {
                    const angle = Math.atan2(dy, dx);
                    const force = (15 - distance) / 15;
                    return {
                        ...d,
                        offset: {
                            x: d.offset.x - Math.cos(angle) * force * 5,
                            y: d.offset.y - Math.sin(angle) * force * 5
                        }
                    };
                }
                return d;
            }));
        }, 16);
        return () => clearInterval(interval);
    }
  }, [holding, mousePos]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth'; // Rougher sound for tension
    osc.frequency.value = 100; // Start low
    
    // Low pass filter to dampen the harshness initially
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 500;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);

    oscRef.current = osc;
    gainRef.current = gain;
  };

  const updateAudio = (prog: number) => {
    if (oscRef.current && audioCtxRef.current) {
       // Pitch rises from 100Hz to 600Hz
       const targetFreq = 100 + (prog * 5); 
       oscRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.1);
       
       // Volume rises slightly
       const targetVol = 0.05 + (prog / 100) * 0.1;
       if (gainRef.current) gainRef.current.gain.setTargetAtTime(targetVol, audioCtxRef.current.currentTime, 0.1);
    }
  };

  const stopAudio = () => {
    if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.1);
        setTimeout(() => {
            if (oscRef.current) {
                oscRef.current.stop();
                oscRef.current.disconnect();
                oscRef.current = null;
            }
        }, 100);
    }
  };

  const startTest = () => {
    if (complete) return;
    setHolding(true);
    setFailed(false);
    setProgress(0);
    initAudio();
    if (window.navigator.vibrate) window.navigator.vibrate(50);
  };

  const endTest = () => {
    if (complete) return;
    setHolding(false);
    stopAudio();
    
    if (progress < 100) {
      setFailed(true);
      setShake(30); // Strong shake on fail
      setTimeout(() => setShake(0), 500);
      setProgress(0);
      setDistractions([]);
      if (window.navigator.vibrate) window.navigator.vibrate([100, 50, 100]);
    }
  };

  useEffect(() => {
    if (holding && !complete) {
      timerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setComplete(true);
            setHolding(false);
            setDistractions([]);
            stopAudio();
            completeExercise('resilience', 500);
            if (window.navigator.vibrate) window.navigator.vibrate([50, 50, 200]);
            return 100;
          }
          
          updateAudio(prev);

          // Increasing difficulty curve
          const difficulty = prev / 100; // 0 to 1
          const spawnChance = 0.05 + (difficulty * 0.2); // Increases as you hold

          // Random shake based on difficulty
          if (Math.random() < difficulty * 0.5) {
             setShake(difficulty * 10);
             setTimeout(() => setShake(0), 50);
             if (window.navigator.vibrate && Math.random() > 0.8) window.navigator.vibrate(10);
          }

          if (Math.random() < spawnChance) {
             const types = ['insta', 'slack', 'news', 'msg'];
             const newDistraction = {
                 id: Date.now() + Math.random(),
                 x: Math.random() * 80 + 5,
                 y: Math.random() * 80 + 5,
                 text: DISTRACTION_TEXTS[Math.floor(Math.random() * DISTRACTION_TEXTS.length)],
                 type: types[Math.floor(Math.random() * types.length)],
                 scale: 0.8 + Math.random() * 0.4,
                 offset: { x: 0, y: 0 }
             };
             setDistractions(d => [...d.slice(-5), newDistraction]);
          }
          return prev + 0.4; // Slightly slower
        });
      }, 30);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [holding, complete, DISTRACTION_TEXTS, completeExercise]);

  // Helper to render notification style based on type
  const renderDistraction = (d: any) => {
      let color = "bg-white text-black";
      let icon = "🔔";
      
      if(d.type === 'insta') { color = "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white"; icon = "📸"; }
      if(d.type === 'slack') { color = "bg-[#4A154B] text-white"; icon = "#️⃣"; }
      if(d.type === 'news') { color = "bg-red-600 text-white"; icon = "📰"; }
      if(d.type === 'msg') { color = "bg-green-500 text-white"; icon = "💬"; }

      const dx = mousePos.x - d.x;
      const dy = mousePos.y - d.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const blurAmount = distance < 10 ? (10 - distance) * 2 : 0;

      return (
        <div 
            key={d.id} 
            className={`absolute flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl animate-float pointer-events-none backdrop-blur-md border border-white/10 transition-all duration-75 ${d.type === 'insta' ? '' : 'bg-gray-900/90 text-white'}`}
            style={{ 
                left: `${d.x}%`, 
                top: `${d.y}%`,
                transform: `translate(${d.offset.x}px, ${d.offset.y}px) scale(${d.scale}) rotate(${(Math.random()-0.5)*10}deg)`,
                filter: `blur(${blurAmount}px)`,
                zIndex: 20,
                opacity: 1 - (blurAmount / 20)
            }}
        >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-inner ${color}`}>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">Notification</span>
                <span className="text-xs font-medium whitespace-nowrap">{d.text}</span>
            </div>
        </div>
      )
  }

  // Chromatic Aberration Amount
  const aberration = holding ? progress / 20 : 0; // 0 to 5px

  return (
    <div 
        ref={containerRef}
        className="relative w-full max-w-4xl mx-auto p-12 text-center select-none min-h-[600px] flex flex-col items-center justify-center"
        style={{ 
            transform: `translate(${Math.random() * shake - shake/2}px, ${Math.random() * shake - shake/2}px)`,
        }}
    >
      
      {/* Dynamic Vignette / Tunnel Vision */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-100 ease-out"
        style={{ 
            opacity: holding ? 0.6 + (progress/200) : 0,
            background: `radial-gradient(circle at 50% 50%, transparent ${60 - (progress/2)}%, black ${100 - (progress/3)}%)`
        }}
      ></div>

      {/* Focus Shield Visual */}
      {holding && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-violet-500/20 rounded-full pointer-events-none z-10"
            style={{
                transform: `translate(-50%, -50%) scale(${1 + progress/200})`,
                opacity: 1 - progress/100
            }}
          >
              <div className="absolute inset-0 border border-violet-400/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-violet-400/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          </div>
      )}

      {/* Glitch Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 mix-blend-overlay opacity-50"
        style={{
            backgroundImage: holding ? 'url(https://grainy-gradients.vercel.app/noise.svg)' : 'none',
            opacity: progress / 200
        }}
      ></div>

      {/* Floating Distractions */}
      {holding && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              {distractions.map(renderDistraction)}
          </div>
      )}

      <div className="relative z-30 space-y-12 w-full">
        <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-violet-500/80">
            {t('resilience.badge')}
            </h3>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-violet-500 to-transparent mx-auto"></div>
        </div>
        
        {!complete ? (
          <>
             {/* Dynamic Text with Chromatic Aberration */}
             <div className="h-32 flex items-center justify-center relative">
                <p 
                    className={`text-5xl md:text-7xl font-serif-display transition-all duration-300 relative ${failed ? "text-red-500 scale-110" : "text-white"}`}
                    style={{
                        textShadow: holding ? `${aberration}px 0 red, -${aberration}px 0 blue` : 'none'
                    }}
                >
                    {failed ? t('resilience.focusBroken') : holding ? (progress > 80 ? "ALMOST THERE" : t('resilience.resistNoise')) : t('resilience.holdToFocus')}
                </p>
             </div>
             
             {/* The Button */}
             <div className="relative inline-block group touch-none">
                {/* Outer Energy Field */}
                <div className={`absolute inset-0 rounded-full blur-[60px] transition-all duration-500 ${holding ? 'bg-violet-600 opacity-40 scale-150' : 'bg-white opacity-0 group-hover:opacity-10'}`}></div>
                
                {/* Shockwave Rings */}
                {holding && (
                    <>
                    <div className="absolute inset-0 border border-violet-500 rounded-full animate-[ping_1s_linear_infinite] opacity-50"></div>
                    <div className="absolute inset-0 border border-white rounded-full animate-[ping_1.5s_linear_infinite] opacity-30 animation-delay-500"></div>
                    </>
                )}

                <button
                    onMouseDown={startTest}
                    onMouseUp={endTest}
                    onMouseLeave={endTest}
                    onTouchStart={startTest}
                    onTouchEnd={endTest}
                    className={`relative w-56 h-56 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-3xl
                        ${holding 
                        ? 'bg-violet-950/40 scale-90 border-2 border-violet-400/50 shadow-[0_0_80px_rgba(139,92,246,0.4)]' 
                        : failed 
                            ? 'border-2 border-red-500/50 bg-red-900/20 shake' 
                            : 'border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-105 hover:border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.05)]'
                        }
                    `}
                >
                    {/* Fingerprint / Progress Visual */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className={`transition-all duration-500 ${holding ? 'scale-110' : 'scale-100'}`}>
                            <span className={`text-4xl font-bold tracking-tighter font-mono tabular-nums ${holding ? 'text-white' : 'text-gray-500'}`}>
                                {holding ? `${Math.floor(progress)}%` : t('resilience.start')}
                            </span>
                        </div>
                        {holding && (
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] text-violet-400 uppercase tracking-[0.3em] animate-pulse font-bold">Resisting</span>
                                <div className="flex gap-1 mt-1">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-1 h-1 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Progress Circle SVGs */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-2">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="48%"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="none"
                            className="text-white/5"
                        />
                        {holding && (
                            <circle
                                cx="50%"
                                cy="50%"
                                r="48%"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={700} // 2 * PI * r
                                strokeDashoffset={700 * (1 - progress / 100)}
                                className="text-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.8)] transition-all duration-150"
                                strokeLinecap="round"
                            />
                        )}
                    </svg>
                </button>
             </div>
             
             <div className="space-y-2">
                <p className={`text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 font-bold ${holding ? 'text-violet-400' : 'text-gray-600'}`}>
                    {holding ? t('resilience.instructionKeep') : t('resilience.instructionHold')}
                </p>
                {!holding && !failed && (
                    <div className="flex justify-center gap-4 opacity-30">
                        <div className="w-12 h-px bg-white/50 self-center"></div>
                        <span className="text-[8px] uppercase tracking-widest">Neural Calibration Required</span>
                        <div className="w-12 h-px bg-white/50 self-center"></div>
                    </div>
                )}
             </div>
          </>
        ) : (
          <div className="animate-fade-in-up py-10 space-y-10">
              <div className="relative inline-flex items-center justify-center w-40 h-40">
                 <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                 <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
                 <div className="relative w-full h-full rounded-full bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                    <svg className="w-16 h-16 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                 </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-serif-display text-white leading-tight">{t('resilience.successTitle')}</h2>
                <p className="text-gray-400 max-w-xl mx-auto text-xl leading-relaxed font-light italic">
                    "{t('resilience.successDesc')}"
                </p>
              </div>
              <div className="pt-8">
                  <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest font-bold">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      Neural Pathway Optimized
                  </div>
              </div>
              
              <button 
                onClick={() => { setComplete(false); setProgress(0); }}
                className="mt-12 text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
              >
                Reset Simulation
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResilienceTest;