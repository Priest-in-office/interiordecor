import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.body.classList.add('custom-cursor-active');
    setIsVisible(true);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]');
      if (el) { setIsHovering(true); setCursorText(el.getAttribute('data-cursor') || ''); }
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]');
      if (el) { setIsHovering(false); setCursorText(''); }
    };

    let raf: number;
    const lerp = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (outerRef.current)
        outerRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={outerRef} 
        className={`fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform rounded-full flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] [@media(pointer:coarse)]:hidden ${
          cursorText 
            ? 'w-[100px] h-[100px] -ml-[50px] -mt-[50px] bg-accent-gold border-accent-gold' 
            : isHovering 
              ? 'w-[60px] h-[60px] -ml-[30px] -mt-[30px] bg-accent-gold-light border-accent-gold' 
              : 'w-[40px] h-[40px] -ml-[20px] -mt-[20px] border border-accent-gold'
        }`}
      >
        {cursorText && <span className={`font-body text-[0.65rem] font-medium tracking-[0.08em] uppercase text-bg-deep transition-opacity duration-300 ease-in-out ${cursorText ? 'opacity-100' : 'opacity-0'}`}>{cursorText}</span>}
      </div>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform w-[6px] h-[6px] -ml-[3px] -mt-[3px] bg-accent-gold rounded-full [@media(pointer:coarse)]:hidden" 
      />
    </>
  );
};

export default CustomCursor;
