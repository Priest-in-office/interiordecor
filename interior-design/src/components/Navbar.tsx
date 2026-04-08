import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';

const navLinks = ['Portfolio', 'Services', 'About', 'Contact'];

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav 
      className={`absolute lg:fixed top-0 left-0 right-0 z-[1000] px-[20px] py-[16px] lg:px-[40px] lg:py-[20px] transition-all duration-500 ease-in-out ${
        scrolled ? 'bg-bg-primary/85 backdrop-blur-[20px] !py-[12px] lg:!py-[14px] border-b border-text-primary/5' : ''
      }`} 
      id="navbar"
    >
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
        <a href="#home" className="flex items-baseline gap-[8px] z-[1001]">
          <span className={`font-display text-[1.6rem] font-normal tracking-[0.03em] transition-colors duration-400 ${menuOpen || !scrolled ? 'text-text-light' : 'text-text-primary'}`}>
            Curves & Edges
          </span>
          <span className="font-display text-[1.1rem] font-light italic text-accent-gold tracking-[0.03em] transition-colors duration-400">
            Interiors
          </span>
        </a>
        
        <div className="hidden lg:flex gap-[40px]">
          {navLinks.map(l => (
            <a 
              key={l} 
              href={`#${l.toLowerCase()}`} 
              className={`relative font-body text-[0.82rem] font-normal tracking-[0.06em] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] after:content-[''] after:absolute after:-bottom-[4px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-accent-gold after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'text-text-secondary hover:text-text-primary' : 'text-text-light/80 hover:text-text-light'}`}
            >
              {l}
            </a>
          ))}
        </div>
        
        <MagneticButton
          onClick={() => navigate('/consultation')}
          className={`hidden lg:block text-[0.78rem] font-medium tracking-[0.08em] uppercase px-[28px] py-[12px] border transition-colors duration-300 ${scrolled ? 'border-text-primary text-text-primary hover:bg-text-primary hover:text-text-light' : 'border-text-light/80 text-text-light hover:bg-text-light hover:text-text-primary'}`}
        >
          Book a Consultation
        </MagneticButton>
        
        <button 
          className="flex lg:hidden flex-col gap-[6px] z-[1001] p-[8px]" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Menu"
        >
          <span className={`block w-[28px] h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'bg-text-light translate-y-[7.5px] rotate-45' : (scrolled ? 'bg-text-primary' : 'bg-text-light')}`} />
          <span className={`block w-[28px] h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'bg-text-light opacity-0' : (scrolled ? 'bg-text-primary' : 'bg-text-light')}`} />
          <span className={`block w-[28px] h-[1.5px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'bg-text-light -translate-y-[7.5px] -rotate-45' : (scrolled ? 'bg-text-primary' : 'bg-text-light')}`} />
        </button>
      </div>

      <div 
        className={`fixed inset-0 bg-bg-deep z-[999] flex items-center justify-center transition-[clip-path] duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          menuOpen ? '[clip-path:circle(150%_at_calc(100%-60px)_36px)] pointer-events-auto' : '[clip-path:circle(0%_at_calc(100%-60px)_36px)] pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-[28px]">
          {navLinks.map((l, i) => (
            <a 
              key={l} 
              href={`#${l.toLowerCase()}`} 
              className={`font-display text-[clamp(2rem,6vw,3.5rem)] font-light text-text-light hover:text-accent-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`} 
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }} 
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          ))}
          <MagneticButton 
            className={`mt-[20px] text-[0.82rem] font-medium tracking-[0.08em] uppercase px-[36px] py-[16px] border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-bg-deep transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-solid ${menuOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-[20px]'}`} 
            onClick={() => { setMenuOpen(false); navigate('/consultation'); }}
          >
            Book a Consultation
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

