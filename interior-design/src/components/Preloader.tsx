import { useEffect, useState, useCallback } from 'react';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(onComplete, 1200);
  }, [onComplete]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(handleComplete, 500);
      }
      setProgress(current);
    }, 80);
    return () => clearInterval(interval);
  }, [handleComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-bg-deep flex items-center justify-center transition-[clip-path] duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isExiting ? '[clip-path:inset(0_0_100%_0)]' : '[clip-path:inset(0_0_0_0)]'}`}>
      <div className="flex flex-col items-center gap-[40px]">
        <div className="flex flex-col items-center gap-[4px]">
          <span className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light text-text-light tracking-[0.08em] opacity-0 animate-[preloaderFadeIn_1s_ease-out_forwards]">Curves & Edges</span>
          <span className="font-display text-[clamp(1.2rem,2.5vw,1.8rem)] font-light italic text-accent-gold tracking-[0.05em] opacity-0 animate-[preloaderFadeIn_1s_ease-out_0.3s_forwards]">Interiors</span>
        </div>
        <div className="w-[200px] h-[1px] bg-white/15 rounded-[1px] overflow-hidden">
          <div className="h-full bg-accent-gold transition-[width] duration-300 ease-out" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <span className="font-body text-[0.75rem] text-text-light-muted tracking-[0.2em] font-light">{Math.min(Math.round(progress), 100)}</span>
      </div>
    </div>
  );
};

export default Preloader;
