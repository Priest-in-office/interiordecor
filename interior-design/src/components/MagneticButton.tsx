import { useRef, type ReactNode, type ButtonHTMLAttributes } from 'react';
import gsap from 'gsap';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
}

const MagneticButton = ({ children, strength = 0.3, className = '', ...props }: Props) => {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - left - width / 2) * strength,
      y: (e.clientY - top - height / 2) * strength,
      duration: 0.4, ease: 'power2.out',
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <button ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave} {...props}>
      {children}
    </button>
  );
};

export default MagneticButton;
