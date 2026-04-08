import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.contact__reveal').forEach(el => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-[var(--spacing-section)] bg-bg-dark text-text-light" id="contact">
      <div className="w-full max-w-[1400px] mx-auto px-[var(--spacing-container)] pb-[100px]">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] lg:gap-[100px] items-start">
          {/* Left — Info */}
          <div>
            <span className="contact__reveal font-body text-[0.72rem] font-medium tracking-[0.2em] uppercase text-accent-gold block mb-[16px]">Get in Touch</span>
            <h2 className="contact__reveal font-display text-[clamp(2.5rem,5vw,4rem)] font-light mb-[20px]">Let's Create <em className="italic text-accent-gold">Together</em></h2>
            <p className="contact__reveal text-[1rem] leading-[1.7] text-text-light-muted mb-[36px]">
              Every great space begins with a conversation. Tell us about your vision, and we'll bring it to life with a complimentary consultation.
            </p>
            <div className="contact__reveal flex flex-col gap-[16px] mb-[36px]">
              <a href="mailto:hello@interiorbyher.com" className="flex items-center gap-[12px] text-[0.9rem] text-text-light-muted transition-colors duration-300 hover:text-accent-gold group">
                <span className="w-[40px] h-[40px] rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-accent-gold group-hover:bg-[rgba(197,164,103,0.1)]">
                  <Mail size={16} />
                </span>
                hello@interiorbyher.com
              </a>
              <a href="tel:+2348000000000" className="flex items-center gap-[12px] text-[0.9rem] text-text-light-muted transition-colors duration-300 hover:text-accent-gold group">
                <span className="w-[40px] h-[40px] rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-accent-gold group-hover:bg-[rgba(197,164,103,0.1)]">
                  <Phone size={16} />
                </span>
                +234 800 000 0000
              </a>
              <div className="flex items-center gap-[12px] text-[0.9rem] text-text-light-muted">
                <span className="w-[40px] h-[40px] rounded-full border border-white/15 flex items-center justify-center">
                  <MapPin size={16} />
                </span>
                Lagos · London · Dubai
              </div>
            </div>
            <div className="contact__reveal flex gap-[16px]">
              <a href="#" className="w-[44px] h-[44px] rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-text-light-muted transition-all duration-300 hover:border-accent-gold hover:text-accent-gold hover:bg-[rgba(197,164,103,0.1)]" data-cursor="Follow" aria-label="Instagram"><InstagramIcon size={20} /></a>
              <a href="#" className="w-[44px] h-[44px] rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-text-light-muted transition-all duration-300 hover:border-accent-gold hover:text-accent-gold hover:bg-[rgba(197,164,103,0.1)]" aria-label="Pinterest">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/></svg>
              </a>
            </div>
          </div>

          {/* Right — CTA */}
          <div className="contact__reveal flex flex-col items-center lg:items-start justify-center">
            <div className="w-full rounded-[24px] border border-white/8 bg-white/[0.03] backdrop-blur-[4px] p-[40px] md:p-[56px] flex flex-col gap-[28px]">
              <div>
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-light mb-[12px]">Ready to Transform <em className="italic text-accent-gold">Your Space?</em></h3>
                <p className="text-[0.9rem] leading-[1.7] text-text-light-muted">
                  Book a free consultation and let's discuss your project — from style preferences and spatial challenges to timeline and budget.
                </p>
              </div>
              <ul className="flex flex-col gap-[14px]">
                {['Complimentary 30-minute discovery call', 'Personalized design recommendations', 'Transparent pricing & timeline', 'No obligations — just inspiration'].map((item, i) => (
                  <li key={i} className="flex items-start gap-[10px] text-[0.85rem] text-text-light-muted leading-[1.5]">
                    <span className="mt-[3px] w-[6px] h-[6px] rounded-full bg-accent-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <MagneticButton
                onClick={() => navigate('/consultation')}
                className="w-full flex items-center justify-center gap-[8px] px-[36px] py-[18px] text-[0.82rem] font-medium tracking-[0.08em] uppercase text-bg-deep bg-accent-gold rounded-none transition-all duration-300 hover:bg-[var(--accent-gold-hover)] hover:-translate-y-1 mt-[8px]"
              >
                Book Your Free Consultation <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.08)]">
        <div className="w-full max-w-[1400px] mx-auto py-[32px] px-[var(--spacing-container)] flex flex-col lg:flex-row items-center justify-between gap-[16px] lg:gap-0 text-center lg:text-left">
          <div className="flex items-baseline gap-[8px]">
            <span className="font-display text-[1.1rem] text-text-light">Curves & Edges</span>
            <span className="font-display text-[0.85rem] italic text-accent-gold">Interiors</span>
          </div>
          <p className="text-[0.78rem] text-text-light-muted">© {new Date().getFullYear()} Curves & Edges Interiors. All rights reserved.</p>
          <div className="flex gap-[20px]">
            <a href="#" className="text-[0.78rem] text-text-light-muted transition-colors duration-300 hover:text-accent-gold">Privacy</a>
            <a href="#" className="text-[0.78rem] text-text-light-muted transition-colors duration-300 hover:text-accent-gold">Terms</a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;

