import React, { useEffect, useRef, useState } from 'react';
import VisualOrb from './components/VisualOrb';
import FocusCoach from './components/FocusCoach';
import ScreenTimeCalculator from './components/ScreenTimeCalculator';
import NotificationStorm from './components/NotificationStorm';
import BreathingGuide from './components/BreathingGuide';
import SideNav from './components/SideNav';
import AmbientSound from './components/AmbientSound';
import FocusTimer from './components/FocusTimer';
import NeuralMesh from './components/NeuralMesh';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import ResilienceTest from './components/ResilienceTest';
import DopamineHit from './components/DopamineHit';
import CognitiveBurden from './components/CognitiveBurden';
import DigitalPoisons from './components/DigitalPoisons';
import Footer from './components/Footer';
import { ScrollPhase } from './types';
import { useLanguage } from './contexts/LanguageContext';

// Helper component for tracking visibility
const SectionTrigger: React.FC<{ 
  setPhase: (phase: ScrollPhase) => void; 
  phase: ScrollPhase; 
  children: React.ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
}> = ({ setPhase, phase, children, className = "", id, threshold = 0.5 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase(phase);
        }
      },
      { threshold: threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [setPhase, phase, threshold]);

  return (
    <div ref={ref} id={id} className={`relative z-10 ${className}`}>
        {children}
    </div>
  );
};

const App: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<ScrollPhase>(ScrollPhase.HERO);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [focusMode, setFocusMode] = useState<{ active: boolean; task: string }>({ active: false, task: '' });
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartSession = (task: string) => {
    setFocusMode({ active: true, task });
    document.body.style.overflow = 'hidden';
  };

  const handleEndSession = () => {
    setFocusMode({ active: false, task: '' });
    document.body.style.overflow = 'auto';
  };

  const scrollToPhase = (phase: ScrollPhase) => {
    const element = document.getElementById(`section-${phase}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Focus Timer Overlay */}
      {focusMode.active && (
        <FocusTimer task={focusMode.task} onExit={handleEndSession} />
      )}

      {/* Global Audio Control */}
      {!focusMode.active && <AmbientSound />}

      {/* Side Navigation */}
      <SideNav currentPhase={currentPhase} onNavigate={(phase) => scrollToPhase(phase)} />

      {/* Fixed Background Layer */}
      <VisualOrb phase={currentPhase} />

      {/* Neural Mesh Overlay */}
      <div className="fixed inset-0 z-[1]">
          <NeuralMesh 
            active={currentPhase === ScrollPhase.REWIRING || currentPhase === ScrollPhase.CHAOS || currentPhase === ScrollPhase.CLARITY} 
            isChaos={currentPhase === ScrollPhase.CHAOS} 
          />
      </div>

       {/* Algorithm Overlay */}
       <div className="fixed inset-0 z-[1]">
          <AlgorithmVisualizer active={currentPhase === ScrollPhase.ALGORITHM} />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[60] shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-between items-center pointer-events-none mix-blend-difference">
        <div className="text-2xl font-bold tracking-tighter font-serif-display pointer-events-auto text-white">FocusFlow</div>
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Language Switcher */}
          <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${language === 'en' ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('ru')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${language === 'ru' ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
            >
              RU
            </button>
          </div>

          <button 
            onClick={() => scrollToPhase(ScrollPhase.ACTION)}
            className="hidden md:block px-6 py-2 rounded-full border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all backdrop-blur-sm text-white"
          >
            {t('nav.takeControl')}
          </button>
        </div>
      </nav>

      {/* Scrollable Content */}
      <main className="relative z-10">
        
        {/* Phase 0: Hero */}
        <SectionTrigger id={`section-${ScrollPhase.HERO}`} phase={ScrollPhase.HERO} setPhase={setCurrentPhase} className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center space-y-12 animate-fade-in-up max-w-6xl mx-auto">
            <h1 className="text-7xl md:text-[11rem] leading-[0.85] font-bold tracking-tighter text-white transition-transform duration-100 hover:scale-[1.01] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              {t('hero.titleLine1')}<br />{t('hero.titleLine2')} <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
              {t('hero.subtitle')}
            </p>
            <div className="pt-20 animate-bounce opacity-30">
              <span className="text-[10px] uppercase tracking-[0.3em]">{t('hero.scroll')}</span>
            </div>
          </div>
        </SectionTrigger>

        {/* Phase 1: The Algorithm (Interactive) */}
        <SectionTrigger id={`section-${ScrollPhase.ALGORITHM}`} phase={ScrollPhase.ALGORITHM} setPhase={setCurrentPhase} className="min-h-screen flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px]">
           <div className="max-w-4xl mx-auto text-center space-y-8 relative z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-green-500/30 bg-green-900/10 rounded-full text-green-400 text-[10px] uppercase tracking-widest mb-4 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                {t('algorithm.badge')}
              </div>
              <h2 className="text-5xl md:text-8xl font-bold font-serif-display text-transparent bg-clip-text bg-gradient-to-b from-white to-green-900 leading-[0.9]">
                {t('algorithm.title')}
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-left mt-12 border-t border-green-500/20 pt-8">
                 <div className="space-y-2">
                    <h4 className="text-green-500 font-mono text-xs uppercase tracking-widest">{t('algorithm.targeting')}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{t('algorithm.targetingDesc')}</p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-green-500 font-mono text-xs uppercase tracking-widest">{t('algorithm.prediction')}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{t('algorithm.predictionDesc')}</p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-green-500 font-mono text-xs uppercase tracking-widest">{t('algorithm.capture')}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{t('algorithm.captureDesc')}</p>
                 </div>
              </div>
           </div>
        </SectionTrigger>

        {/* Phase 2: Dopamine Trap (Interactive) */}
        <SectionTrigger id={`section-${ScrollPhase.DOPAMINE}`} phase={ScrollPhase.DOPAMINE} setPhase={setCurrentPhase} className="min-h-screen flex flex-col items-center justify-center p-6">
            <DopamineHit />
            <div className="max-w-4xl w-full">
                <DigitalPoisons />
            </div>
        </SectionTrigger>

        {/* Phase 3: Cognitive Burden (Interactive) */}
        <SectionTrigger id={`section-${ScrollPhase.BURDEN}`} phase={ScrollPhase.BURDEN} setPhase={setCurrentPhase} className="min-h-screen flex items-center justify-center p-6">
            <CognitiveBurden />
        </SectionTrigger>

        {/* Phase 4: The Problem (Interactive) */}
        <SectionTrigger id={`section-${ScrollPhase.PROBLEM}`} phase={ScrollPhase.PROBLEM} setPhase={setCurrentPhase} className="min-h-screen flex items-center justify-center p-6 py-24">
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 order-2 md:order-1">
              <h2 className="text-6xl md:text-8xl font-bold leading-[0.9] font-serif-display">
                {t('problem.title')} <br/> <span className="text-orange-500 italic">{t('problem.titleHighlight')}</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                {t('problem.desc')}
              </p>
              <div className="flex items-center gap-4 text-orange-500/80 text-xs font-mono uppercase tracking-widest">
                  <div className="h-px w-12 bg-orange-500/50"></div>
                  <span>{t('problem.quantify')}</span>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
               <ScreenTimeCalculator />
            </div>
          </div>
        </SectionTrigger>

        {/* Phase 5: The Chaos (Sticky Scroll) */}
        <div id={`section-${ScrollPhase.CHAOS}`} className="relative h-[250vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
             
             {/* Notification Storm Overlay */}
             <NotificationStorm active={currentPhase === ScrollPhase.CHAOS} />

             {/* Background noise text */}
             <SectionTrigger phase={ScrollPhase.CHAOS} setPhase={setCurrentPhase} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center px-4 mix-blend-overlay opacity-20">
                   <h2 className="text-[20vw] font-bold leading-none tracking-tighter blur-sm text-red-500">{t('chaos.noise')}</h2>
                </div>
             </SectionTrigger>

             <div className="relative z-20 max-w-4xl text-center px-6 backdrop-blur-md bg-black/60 p-16 rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white relative z-10 leading-tight">
                  {t('chaos.title')} <span className="text-red-500">{t('chaos.titleHighlight')}</span>
                </h2>
                <p className="text-2xl md:text-4xl text-white/80 font-serif-display italic leading-snug relative z-10 whitespace-pre-line">
                  {t('chaos.quote')}
                </p>
                <div className="mt-10 inline-block px-4 py-2 border border-white/20 rounded-full text-xs text-gray-400 uppercase tracking-widest">
                   {t('chaos.badge')}
                </div>
             </div>
          </div>
        </div>

        {/* Phase 6: Rewiring (Neuroplasticity) */}
        <SectionTrigger id={`section-${ScrollPhase.REWIRING}`} phase={ScrollPhase.REWIRING} setPhase={setCurrentPhase} className="min-h-screen flex items-center justify-center p-6">
           <div className="max-w-5xl mx-auto text-center space-y-12 pointer-events-none">
              <div className="inline-block px-3 py-1 border border-cyan-500/30 rounded-full text-cyan-400 text-[10px] uppercase tracking-widest mb-2">{t('rewiring.badge')}</div>
              <h2 className="text-6xl md:text-9xl font-serif-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-cyan-400 to-blue-600 leading-[0.9] pb-4">
                {t('rewiring.title')}
              </h2>
              <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                {t('rewiring.desc')} <span className="text-cyan-400">{t('rewiring.descHighlight')}</span> {t('rewiring.descEnd')}
              </p>
              <div className="text-xs font-mono text-cyan-500/50 pt-12 animate-pulse">
                 {t('rewiring.hint')}
              </div>
           </div>
        </SectionTrigger>

        {/* Phase 7: Clarity */}
        <SectionTrigger id={`section-${ScrollPhase.CLARITY}`} phase={ScrollPhase.CLARITY} setPhase={setCurrentPhase} className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-black/0 via-teal-900/10 to-black/0">
          <div className="flex flex-col gap-24 items-center max-w-6xl w-full">
             
             {/* Main Content */}
             <div className="grid md:grid-cols-2 gap-16 items-center w-full">
                <div className="space-y-10">
                    <h2 className="text-5xl md:text-7xl font-serif-display text-white leading-tight">
                      {t('clarity.title')} <br/><span className="text-emerald-400 italic">{t('clarity.titleHighlight')}</span>
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                      {t('clarity.desc')}
                    </p>
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="text-emerald-400 text-2xl font-serif-display mb-1">2.5x</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500">{t('clarity.stat1')}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="text-emerald-400 text-2xl font-serif-display mb-1">40%</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500">{t('clarity.stat2')}</div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-center relative">
                   {/* Decorative circle */}
                   <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl transform scale-75"></div>
                   <BreathingGuide />
                </div>
             </div>
          </div>
        </SectionTrigger>

        {/* Phase 8: The Manifesto */}
        <SectionTrigger id={`section-${ScrollPhase.MANIFESTO}`} phase={ScrollPhase.MANIFESTO} setPhase={setCurrentPhase} className="min-h-screen flex items-center justify-center p-6 bg-white text-black">
           <div className="max-w-6xl mx-auto space-y-20 relative z-10">
              <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-[0.8]">
                {t('manifesto.title')} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">{t('manifesto.depth')}</span> {t('manifesto.over')} <br/>
                {t('manifesto.breadth')}
              </h2>
              <div className="grid md:grid-cols-3 gap-12 text-lg font-medium border-t border-black py-10">
                 <p className="leading-relaxed">{t('manifesto.p1')}</p>
                 <p className="leading-relaxed">{t('manifesto.p2')}</p>
                 <div className="flex items-end justify-end">
                     <div className="w-16 h-16 rounded-full border border-black flex items-center justify-center animate-[spin_10s_linear_infinite]">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5 10 5 10-5-5-2.5-5 2.5z"/></svg>
                     </div>
                 </div>
              </div>
           </div>
        </SectionTrigger>

        {/* Phase 9: Resilience Test */}
        <SectionTrigger id={`section-${ScrollPhase.RESILIENCE}`} phase={ScrollPhase.RESILIENCE} setPhase={setCurrentPhase} className="min-h-screen flex items-center justify-center p-6">
           <ResilienceTest />
        </SectionTrigger>

        {/* Phase 10: Action / AI Tool */}
        <SectionTrigger id={`section-${ScrollPhase.ACTION}`} phase={ScrollPhase.ACTION} setPhase={setCurrentPhase} className="min-h-screen flex items-center justify-center p-6 pb-24">
          <div id="start" className="text-center w-full max-w-2xl mx-auto relative z-10">
            <div className="mb-16 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                {t('action.badge')}
              </div>
              <h2 className="text-5xl md:text-7xl font-bold font-serif-display text-white">
                {t('action.title')}
              </h2>
              <p className="text-gray-400 text-xl font-light">
                {t('action.desc')}
              </p>
            </div>
            
            <FocusCoach onStartSession={handleStartSession} />
            
            <div className="mt-24 grid grid-cols-3 gap-8 text-center text-gray-600 uppercase text-[10px] tracking-widest font-mono border-t border-white/5 pt-8">
              <div className="hover:text-white transition-colors">
                <div className="text-xl text-white mb-2 font-serif-display">2.5</div>
                Gemini Flash
              </div>
              <div className="hover:text-white transition-colors">
                <div className="text-xl text-white mb-2 font-serif-display">0.1s</div>
                {t('action.latency')}
              </div>
              <div className="hover:text-white transition-colors">
                <div className="text-xl text-white mb-2 font-serif-display">100%</div>
                {t('action.privacy')}
              </div>
            </div>
          </div>
        </SectionTrigger>

        <Footer />
      </main>
    </div>
  );
};

export default App;