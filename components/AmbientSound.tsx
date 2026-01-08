
import React, { useState, useEffect, useRef } from 'react';

const AmbientSound: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleSound = async () => {
    if (!audioContextRef.current) {
      // Initialize Audio Context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      // Create Brown Noise Buffer
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; 
      }

      // Create Source
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      
      // Create Gain Node for Volume Control
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.05; // Low volume start
      gainNodeRef.current = gainNode;

      noiseSource.connect(gainNode);
      gainNode.connect(ctx.destination);
      noiseSource.start(0);
    }

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      // Fade out
      gainNodeRef.current?.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 1);
      setTimeout(() => {
        audioContextRef.current?.suspend();
        setIsPlaying(false);
      }, 1000);
    } else {
      // Fade in
      audioContextRef.current.resume();
      gainNodeRef.current?.gain.exponentialRampToValueAtTime(0.05, audioContextRef.current.currentTime + 1);
      setIsPlaying(true);
    }
  };

  return (
    <button 
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-[60] group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white"
      title={isPlaying ? "Mute Focus Sound" : "Play Brown Noise"}
    >
      {isPlaying ? (
        <div className="flex gap-1 items-end h-4">
          <div className="w-1 bg-white animate-[bounce_1s_infinite] h-2"></div>
          <div className="w-1 bg-white animate-[bounce_1.2s_infinite] h-4"></div>
          <div className="w-1 bg-white animate-[bounce_0.8s_infinite] h-3"></div>
        </div>
      ) : (
        <svg className="w-5 h-5 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
};

export default AmbientSound;
