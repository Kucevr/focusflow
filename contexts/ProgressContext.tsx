import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressState {
  completedExercises: string[];
  unlockedThemes: string[];
  unlockedSounds: string[];
  experience: number;
  level: number;
}

interface ProgressContextType extends ProgressState {
  completeExercise: (id: string, exp: number) => void;
  unlockTheme: (id: string) => void;
  unlockSound: (id: string) => void;
  addExperience: (amount: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('focusflow_progress');
    return saved ? JSON.parse(saved) : {
      completedExercises: [],
      unlockedThemes: ['default'],
      unlockedSounds: ['brown_noise'],
      experience: 0,
      level: 1
    };
  });

  useEffect(() => {
    localStorage.setItem('focusflow_progress', JSON.stringify(state));
  }, [state]);

  const addExperience = (amount: number) => {
    setState(prev => {
      const newExp = prev.experience + amount;
      const newLevel = Math.floor(Math.sqrt(newExp / 100)) + 1;
      return { ...prev, experience: newExp, level: newLevel };
    });
  };

  const completeExercise = (id: string, exp: number) => {
    setState(prev => {
      if (prev.completedExercises.includes(id)) return prev;
      const newExp = prev.experience + exp;
      const newLevel = Math.floor(Math.sqrt(newExp / 100)) + 1;
      return {
        ...prev,
        completedExercises: [...prev.completedExercises, id],
        experience: newExp,
        level: newLevel
      };
    });
  };

  const unlockTheme = (id: string) => {
    setState(prev => ({
      ...prev,
      unlockedThemes: prev.unlockedThemes.includes(id) ? prev.unlockedThemes : [...prev.unlockedThemes, id]
    }));
  };

  const unlockSound = (id: string) => {
    setState(prev => ({
      ...prev,
      unlockedSounds: prev.unlockedSounds.includes(id) ? prev.unlockedSounds : [...prev.unlockedSounds, id]
    }));
  };

  return (
    <ProgressContext.Provider value={{ ...state, completeExercise, unlockTheme, unlockSound, addExperience }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
