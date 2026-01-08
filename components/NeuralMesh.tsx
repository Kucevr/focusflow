import React, { useEffect, useRef } from 'react';

interface NeuralMeshProps {
  active: boolean;
  isChaos?: boolean;
}

const NeuralMesh: React.FC<NeuralMeshProps> = ({ active, isChaos = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = width < 768 ? 50 : 120; // Increased for better effect
    const connectionDistance = isChaos ? 100 : 180;
    const mouseDistance = 250;

    let mouse = { x: -1000, y: -1000 };
    let frame = 0;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;
      color: string;
      phase: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * (isChaos ? 2 : 0.8);
        this.vy = (Math.random() - 0.5) * (isChaos ? 2 : 0.8);
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        this.phase = Math.random() * Math.PI * 2;
        this.color = '';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Neuroplasticity effect: Pulsing size
        this.phase += 0.05;
        this.size = this.baseSize + Math.sin(this.phase) * 1;

        // Chaos effect: Jitter
        if (isChaos) {
            this.vx += (Math.random() - 0.5) * 0.1;
            this.vy += (Math.random() - 0.5) * 0.1;
            // Limit speed
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 3) {
                this.vx *= 0.9;
                this.vy *= 0.9;
            }
        }

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            
            // Chaos repels, Clarity attracts
            const multiplier = isChaos ? -0.2 : 0.08;
            this.vx += forceDirectionX * force * multiplier;
            this.vy += forceDirectionY * force * multiplier;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (isChaos) {
            ctx.fillStyle = `rgba(239, 68, 68, ${0.4 + Math.sin(this.phase) * 0.2})`; // Pulsing Red
        } else {
            ctx.fillStyle = active ? 'rgba(52, 211, 153, 0.8)' : 'rgba(255, 255, 255, 0.1)';
        }
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      frame++;
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((a, index) => {
        for (let j = index + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = (1 - distance / connectionDistance);
            
            if (isChaos) {
                ctx.strokeStyle = `rgba(239, 68, 68, ${opacity * 0.3})`;
                ctx.lineWidth = 0.5;
            } else {
                ctx.strokeStyle = active 
                    ? `rgba(52, 211, 153, ${opacity * 0.6})` 
                    : `rgba(255, 255, 255, ${0.1 * opacity})`;
                ctx.lineWidth = active ? 1.5 : 1;
            }
            
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      });

      // Clarity effect: occasional "synapse flash"
      if (!isChaos && active && Math.random() > 0.98) {
          const p1 = particles[Math.floor(Math.random() * particles.length)];
          const p2 = particles[Math.floor(Math.random() * particles.length)];
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [active, isChaos]);

  return (
    <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${active || isChaos ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

export default NeuralMesh;