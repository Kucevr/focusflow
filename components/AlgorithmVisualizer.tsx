import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProgress } from '../contexts/ProgressContext';

interface Enemy {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    type: string;
    angle: number;
}

const AlgorithmVisualizer: React.FC<{ active: boolean }> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataPoints, setDataPoints] = useState<string[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [score, setScore] = useState(0);
  const { t } = useLanguage();
  const { completeExercise } = useProgress();
  
  // Simulated data stream
  useEffect(() => {
      if(!active) return;
      const interval = setInterval(() => {
          const hex = Math.random().toString(16).substr(2, 8).toUpperCase();
          const tag = ["USER_ID", "SESSION", "GEO", "CLICK", "HOVER", "SCROLL"][Math.floor(Math.random() * 6)];
          setDataPoints(prev => [`> ${tag}: 0x${hex}`, ...prev.slice(0, 5)]);
      }, 200);
      return () => clearInterval(interval);
  }, [active]);

  // Game Logic: Spawn Enemies
  useEffect(() => {
      if(!active) return;
      const interval = setInterval(() => {
          setEnemies(prev => {
              if (prev.length > 15) return prev;
              const side = Math.floor(Math.random() * 4);
              let x = 0, y = 0;
              if(side === 0) { x = Math.random() * window.innerWidth; y = -50; }
              if(side === 1) { x = window.innerWidth + 50; y = Math.random() * window.innerHeight; }
              if(side === 2) { x = Math.random() * window.innerWidth; y = window.innerHeight + 50; }
              if(side === 3) { x = -50; y = Math.random() * window.innerHeight; }

              return [...prev, {
                  id: Date.now() + Math.random(),
                  x, y,
                  size: 30 + Math.random() * 40,
                  speed: 1 + Math.random() * 2,
                  type: ["AD", "REEL", "NOTIF", "FOMO"][Math.floor(Math.random() * 4)],
                  angle: Math.random() * Math.PI * 2
              }];
          });
      }, 1000);
      return () => clearInterval(interval);
  }, [active]);

  // Game Logic: Move Enemies
  useEffect(() => {
      if(!active) return;
      const interval = setInterval(() => {
          setEnemies(prev => prev.map(e => {
              const dx = (window.innerWidth / 2) - e.x;
              const dy = (window.innerHeight / 2) - e.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              return {
                  ...e,
                  x: e.x + (dx / dist) * e.speed,
                  y: e.y + (dy / dist) * e.speed,
                  angle: e.angle + 0.02
              };
          }).filter(e => {
              const dx = (window.innerWidth / 2) - e.x;
              const dy = (window.innerHeight / 2) - e.y;
              return Math.sqrt(dx*dx + dy*dy) > 20;
          }));
      }, 16);
      return () => clearInterval(interval);
  }, [active]);

  const handleCanvasClick = (e: React.MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if(!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setEnemies(prev => {
          const filtered = prev.filter(enemy => {
              const dist = Math.sqrt((enemy.x - x)**2 + (enemy.y - y)**2);
              if(dist < enemy.size) {
                  setScore(s => {
                      const newScore = s + 10;
                      if(newScore % 100 === 0) completeExercise('algorithm', 100);
                      return newScore;
                  });
                  if(window.navigator.vibrate) window.navigator.vibrate(20);
                  return false;
              }
              return true;
          });
          return filtered;
      });
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let scanLineY = 0;
    
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (active) {
        // 1. Draw Scan Line
        scanLineY += 5;
        if (scanLineY > canvas.height) scanLineY = 0;
        
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.2)';
        ctx.lineWidth = 1;
        ctx.moveTo(0, scanLineY);
        ctx.lineTo(canvas.width, scanLineY);
        ctx.stroke();

        // 2. Draw Enemies
        enemies.forEach(e => {
            ctx.save();
            ctx.translate(e.x, e.y);
            ctx.rotate(e.angle);
            
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(-e.size/2, -e.size/2, e.size, e.size);
            
            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            ctx.fillRect(-e.size/2, -e.size/2, e.size, e.size);
            
            ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
            ctx.font = '10px monospace';
            ctx.fillText(e.type, -e.size/2, -e.size/2 - 5);
            
            // Glitch effect lines
            if(Math.random() > 0.9) {
                ctx.beginPath();
                ctx.moveTo(-e.size, 0);
                ctx.lineTo(e.size, 0);
                ctx.stroke();
            }
            
            ctx.restore();
        });

        // 3. Draw "Core" (The User's Attention)
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const coreSize = 40 + Math.sin(Date.now() / 500) * 5;
        
        ctx.beginPath();
        ctx.arc(cx, cy, coreSize, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(0, 255, 65, 0.1)';
        ctx.fill();

        // 4. HUD Brackets
        const size = 200;
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.4)';
        const cornerLen = 20;
        // TL
        ctx.beginPath(); ctx.moveTo(cx - size/2, cy - size/2 + cornerLen); ctx.lineTo(cx - size/2, cy - size/2); ctx.lineTo(cx - size/2 + cornerLen, cy - size/2); ctx.stroke();
        // TR
        ctx.beginPath(); ctx.moveTo(cx + size/2 - cornerLen, cy - size/2); ctx.lineTo(cx + size/2, cy - size/2); ctx.lineTo(cx + size/2, cy - size/2 + cornerLen); ctx.stroke();
        // BL
        ctx.beginPath(); ctx.moveTo(cx - size/2, cy + size/2 - cornerLen); ctx.lineTo(cx - size/2, cy + size/2); ctx.lineTo(cx - size/2 + cornerLen, cy + size/2); ctx.stroke();
        // BR
        ctx.beginPath(); ctx.moveTo(cx + size/2 - cornerLen, cy + size/2); ctx.lineTo(cx + size/2, cy + size/2); ctx.lineTo(cx + size/2, cy + size/2 - cornerLen); ctx.stroke();

        // 5. "Recording" indicator
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(50, 50, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '12px monospace';
        ctx.fillText('REC', 65, 54);
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [active, enemies]);

  if (!active) return null;

  return (
    <>
      <canvas 
        ref={canvasRef} 
        onClick={handleCanvasClick}
        className="absolute inset-0 z-0 cursor-crosshair" 
      />
      
      {/* HUD Overlay Elements */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 font-mono text-green-500 text-xs pointer-events-none z-10 flex flex-col gap-2 opacity-80">
          <div className="bg-black/80 p-4 border-l-2 border-green-500 backdrop-blur-sm">
            <div className="text-green-300 font-bold mb-2 tracking-widest uppercase">{t('algorithm.hud.dataStream')}</div>
            {dataPoints.map((point, i) => (
                <div key={i} className="opacity-70">{point}</div>
            ))}
          </div>
          
          <div className="bg-black/80 p-4 border-l-2 border-green-500 backdrop-blur-sm mt-4">
             <div className="flex justify-between gap-8 mb-1">
                <span>ATTENTION_SCORE</span>
                <span className="text-green-400 font-bold">{score}</span>
             </div>
             <div className="flex justify-between gap-8 mb-1">
                <span>{t('algorithm.hud.retention')}</span>
                <span className="text-red-400 font-bold animate-pulse">99.2%</span>
             </div>
             <div className="flex justify-between gap-8 mb-1">
                <span>{t('algorithm.hud.predictive')}</span>
                <span className="text-green-300">{t('algorithm.hud.accurate')}</span>
             </div>
             <div className="flex justify-between gap-8">
                <span>{t('algorithm.hud.vulnerability')}</span>
                <span className="text-yellow-400">{t('algorithm.hud.high')}</span>
             </div>
          </div>

          <div className="mt-4 text-[10px] text-green-500/50 text-center animate-pulse">
             [ CLICK TO NEUTRALIZE DISTRACTIONS ]
          </div>
      </div>
    </>
  );
};

export default AlgorithmVisualizer;