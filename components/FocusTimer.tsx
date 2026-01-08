import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';

interface FocusTimerProps {
  durationMinutes?: number;
  onExit: () => void;
  task: string;
}

type SoundMode = 'brown' | 'rain' | 'waves' | 'none';

const FocusTimer: React.FC<FocusTimerProps> = ({ durationMinutes = 25, onExit, task }) => {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [isActive, setIsActive] = useState(true);
  const [soundMode, setSoundMode] = useState<SoundMode>('brown');
  const [isDeepWork, setIsDeepWork] = useState(false);
  const { t } = useLanguage();
  const { completeExercise } = useProgress();

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodesRef = useRef<AudioNode[]>([]);

  // Sound Generation Logic
  const stopSound = () => {
     if (gainNodeRef.current && audioCtxRef.current) {
         gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
     }
     setTimeout(() => {
        sourceNodesRef.current.forEach(node => {
            try { (node as any).stop?.(); } catch(e){}
            node.disconnect();
        });
        sourceNodesRef.current = [];
     }, 500);
  };

  const playSound = (mode: SoundMode) => {
     stopSound();
     if (mode === 'none') return;

     if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
     }
     const ctx = audioCtxRef.current;
     if (ctx.state === 'suspended') ctx.resume();

     const masterGain = ctx.createGain();
     masterGain.gain.setValueAtTime(0, ctx.currentTime);
     masterGain.gain.linearRampToValueAtTime(isDeepWork ? 0.15 : 0.1, ctx.currentTime + 1); // Fade in
     masterGain.connect(ctx.destination);
     gainNodeRef.current = masterGain;

     // Helper: Create Noise Buffer
     const createNoise = (type: 'white' | 'pink' | 'brown') => {
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            if (type === 'brown') {
                const white = Math.random() * 2 - 1;
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                output[i] *= 3.5;
            } else if (type === 'pink') {
                 const white = Math.random() * 2 - 1;
                 output[i] = (lastOut + (0.02 * white)) / 1.02;
                 lastOut = output[i];
                 output[i] *= 1.5;
            } else {
                output[i] = Math.random() * 2 - 1;
            }
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        return noise;
     };

     if (mode === 'brown') {
         const noise = createNoise('brown');
         noise.connect(masterGain);
         noise.start();
         sourceNodesRef.current.push(noise);
     } else if (mode === 'rain') {
         const noise = createNoise('pink');
         const filter = ctx.createBiquadFilter();
         filter.type = 'lowpass';
         filter.frequency.value = isDeepWork ? 600 : 800;
         noise.connect(filter);
         filter.connect(masterGain);
         noise.start();
         sourceNodesRef.current.push(noise, filter);
     } else if (mode === 'waves') {
         const noise = createNoise('brown');
         const waveGain = ctx.createGain();
         const lfo = ctx.createOscillator();
         lfo.type = 'sine';
         lfo.frequency.value = isDeepWork ? 0.05 : 0.1;
         
         lfo.connect(waveGain.gain);
         noise.connect(waveGain);
         waveGain.connect(masterGain);
         
         noise.start();
         lfo.start();
         sourceNodesRef.current.push(noise, lfo, waveGain);
     }
  };

  useEffect(() => {
     playSound(soundMode);
     return () => stopSound();
  }, [soundMode, isDeepWork]);

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => {
            if(time % 60 === 0) completeExercise('timer', 10); // XP for every minute
            return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      stopSound();
      completeExercise('timer', 500); // Bonus for completion
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, completeExercise]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((durationMinutes * 60 - timeLeft) / (durationMinutes * 60)) * 100;

  return (
    <div className={`fixed inset-0 z-[100] transition-colors duration-1000 flex flex-col items-center justify-center animate-fade-in ${isDeepWork ? 'bg-[#050505]' : 'bg-black'}`}>
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isDeepWork ? 'opacity-40' : 'opacity-20'}`}
           style={{ background: 'radial-gradient(circle at center, #4f46e5 0%, transparent 70%)' }}></div>
      
      {/* Background Pulse */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] animate-pulse duration-[4000ms] transition-all ${isDeepWork ? 'w-[80vh] h-[80vh] bg-indigo-900/30' : 'w-[60vh] h-[60vh] bg-indigo-500/10'}`}></div>

      <div className="relative z-10 text-center space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
              <div className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-400">{t('timer.currentFocus')}</div>
              {isDeepWork && (
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 text-[10px] text-indigo-300 animate-pulse">
                      DEEP WORK ACTIVE
                  </span>
              )}
          </div>
          <h2 className={`text-3xl md:text-5xl font-serif-display text-white max-w-2xl mx-auto leading-tight transition-all duration-1000 ${isDeepWork ? 'tracking-widest opacity-90' : ''}`}>
            "{task}"
          </h2>
        </div>

        <div className="relative inline-flex items-center justify-center group">
            {/* Progress Circle SVG */}
            <svg className="w-80 h-80 transform -rotate-90">
                <circle
                cx="160"
                cy="160"
                r="150"
                stroke="currentColor"
                strokeWidth={isDeepWork ? "1" : "2"}
                fill="transparent"
                className="text-white/5"
                />
                <circle
                cx="160"
                cy="160"
                r="150"
                stroke="currentColor"
                strokeWidth={isDeepWork ? "4" : "2"}
                fill="transparent"
                strokeDasharray={2 * Math.PI * 150}
                strokeDashoffset={2 * Math.PI * 150 * (1 - progress / 100)}
                className={`transition-all duration-1000 ease-linear ${isDeepWork ? 'text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]' : 'text-indigo-500'}`}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className={`text-6xl md:text-8xl font-mono font-light tracking-tighter tabular-nums transition-all duration-1000 ${isDeepWork ? 'scale-110 text-indigo-100' : 'text-white'}`}>
                    {formatTime(timeLeft)}
                 </div>
                 <button 
                    onClick={() => setIsDeepWork(!isDeepWork)}
                    className={`mt-4 text-[10px] uppercase tracking-[0.4em] transition-all duration-500 ${isDeepWork ? 'text-indigo-400 opacity-100' : 'text-gray-600 opacity-0 group-hover:opacity-100'}`}
                 >
                    {isDeepWork ? 'Exit Deep Mode' : 'Enter Deep Mode'}
                 </button>
            </div>
        </div>

        {/* Sound Controls */}
        <div className={`space-y-4 transition-all duration-1000 ${isDeepWork ? 'opacity-20 blur-sm hover:opacity-100 hover:blur-none' : ''}`}>
             <span className="text-[10px] uppercase tracking-widest text-gray-500">{t('timer.soundscape')}</span>
             <div className="flex gap-2 justify-center">
                 {(['brown', 'rain', 'waves', 'none'] as SoundMode[]).map((mode) => (
                     <button
                        key={mode}
                        onClick={() => setSoundMode(mode)}
                        className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider border transition-all ${soundMode === mode ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600'}`}
                     >
                         {t(`timer.sounds.${mode}`)}
                     </button>
                 ))}
             </div>
        </div>

        <div>
            <button 
                onClick={onExit}
                className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-xs uppercase tracking-widest text-white/50 hover:text-white mt-8"
            >
                {t('timer.endSession')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;