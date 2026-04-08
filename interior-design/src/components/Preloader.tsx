import { useEffect, useState, useCallback } from 'react';
import './Preloader.css';

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
    <div className={`preloader ${isExiting ? 'preloader--exit' : ''}`}>
      <div className="preloader__content">
        <div className="preloader__logo">
          <span className="preloader__logo-main">Interior</span>
          <span className="preloader__logo-accent">by Her</span>
        </div>
        <div className="preloader__progress">
          <div className="preloader__bar" style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
        <span className="preloader__counter">{Math.min(Math.round(progress), 100)}</span>
      </div>
    </div>
  );
};

export default Preloader;
