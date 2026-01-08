export enum ScrollPhase {
  HERO = 0,
  ALGORITHM = 1,
  DOPAMINE = 2,
  BURDEN = 3,
  PROBLEM = 4,
  CHAOS = 5,
  REWIRING = 6,
  CLARITY = 7,
  MANIFESTO = 8,
  RESILIENCE = 9,
  ACTION = 10
}

export type Language = 'en' | 'ru';

export interface FocusAdvice {
  mantra: string;
  action: string;
}