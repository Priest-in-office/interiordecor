import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';
import './Navbar.css';

const navLinks = ['Portfolio', 'Services', 'About', 'Contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`} id="navbar">
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo">
          <span className="navbar__logo-main">Interior</span>
          <span className="navbar__logo-accent">by Her</span>
        </a>
        <div className="navbar__links">
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="navbar__link">{l}</a>
          ))}
        </div>
        <MagneticButton className="navbar__cta">Book a Consultation</MagneticButton>
        <button className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-inner">
          {navLinks.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="navbar__mobile-link" style={{ transitionDelay: `${0.1 + i * 0.08}s` }} onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <MagneticButton className="navbar__mobile-cta" onClick={() => setMenuOpen(false)}>Book a Consultation</MagneticButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
