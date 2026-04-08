import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

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
      <div ref={outerRef} className={`cursor-outer ${isHovering ? 'cursor-outer--hover' : ''} ${cursorText ? 'cursor-outer--text' : ''}`}>
        {cursorText && <span className="cursor-outer__label">{cursorText}</span>}
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

export default CustomCursor;
