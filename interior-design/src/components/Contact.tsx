import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';

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
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', project: '', budget: '' });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We\'ll be in touch within 24 hours.');
    setFormData({ name: '', email: '', project: '', budget: '' });
  };

  const inputClasses = "w-full py-[14px] font-body text-[0.95rem] text-text-light bg-transparent border-0 border-b border-[rgba(255,255,255,0.15)] outline-none transition-colors duration-300 focus:border-accent-gold appearance-none placeholder:text-white/25";
  const labelClasses = "block text-[0.75rem] font-medium tracking-[0.1em] uppercase text-text-light-muted mb-[8px]";

  return (
    <section ref={sectionRef} className="pt-[var(--spacing-section)] bg-bg-dark text-text-light" id="contact">
      <div className="w-full max-w-[1400px] mx-auto px-[var(--spacing-container)] pb-[80px] grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[80px] items-start">
        <div>
          <span className="contact__reveal font-body text-[0.72rem] font-medium tracking-[0.2em] uppercase text-accent-gold block mb-[16px]">Get in Touch</span>
          <h2 className="contact__reveal font-display text-[clamp(2.5rem,5vw,4rem)] font-light mb-[20px]">Let's Create <em className="italic text-accent-gold">Together</em></h2>
          <p className="contact__reveal text-[1rem] leading-[1.7] text-text-light-muted mb-[36px]">
            Every great space begins with a conversation. Tell us about your vision, and we'll bring it to life.
          </p>
          <div className="contact__reveal flex flex-col gap-[12px] mb-[32px]">
            <a href="mailto:hello@interiorbyher.com" className="flex items-center gap-[10px] text-[0.9rem] text-text-light-muted transition-colors duration-300 hover:text-accent-gold">
              <Mail size={18} /> hello@interiorbyher.com
            </a>
            <div className="flex items-center gap-[10px] text-[0.9rem] text-text-light-muted transition-colors duration-300 hover:text-accent-gold">
              <MapPin size={18} /> Lagos · London · Dubai
            </div>
          </div>
          <div className="contact__reveal flex gap-[16px]">
            <a href="#" className="w-[44px] h-[44px] rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-text-light-muted transition-all duration-300 hover:border-accent-gold hover:text-accent-gold hover:bg-[rgba(197,164,103,0.1)]" data-cursor="Follow" aria-label="Instagram"><InstagramIcon size={20} /></a>
            <a href="#" className="w-[44px] h-[44px] rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-text-light-muted transition-all duration-300 hover:border-accent-gold hover:text-accent-gold hover:bg-[rgba(197,164,103,0.1)]" aria-label="Pinterest">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/></svg>
            </a>
          </div>
        </div>
        <form className="contact__reveal flex flex-col gap-[24px]" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="contact-name" className={labelClasses}>Your Name</label>
            <input id="contact-name" type="text" className={inputClasses} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="Full name" />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClasses}>Email Address</label>
            <input id="contact-email" type="email" className={inputClasses} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="contact-project" className={labelClasses}>Tell Us About Your Project</label>
            <textarea id="contact-project" rows={4} className={`${inputClasses} resize-y min-h-[80px]`} value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} placeholder="Describe your dream space..." />
          </div>
          <div>
            <label htmlFor="contact-budget" className={labelClasses}>Estimated Budget</label>
            <select id="contact-budget" className={inputClasses} value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
              <option value="" className="bg-bg-dark text-text-light">Select a range</option>
              <option value="10k-25k" className="bg-bg-dark text-text-light">$10,000 – $25,000</option>
              <option value="25k-50k" className="bg-bg-dark text-text-light">$25,000 – $50,000</option>
              <option value="50k-100k" className="bg-bg-dark text-text-light">$50,000 – $100,000</option>
              <option value="100k+" className="bg-bg-dark text-text-light">$100,000+</option>
            </select>
          </div>
          <MagneticButton type="submit" className="self-start flex items-center gap-[8px] px-[36px] py-[16px] text-[0.82rem] font-medium tracking-[0.08em] uppercase text-bg-deep bg-accent-gold rounded-none transition-all duration-300 hover:bg-[var(--accent-gold-hover)] hover:-translate-y-1">
            Send Inquiry <ArrowUpRight size={16} />
          </MagneticButton>
        </form>
      </div>
      <footer className="border-t border-[rgba(255,255,255,0.08)]">
        <div className="w-full max-w-[1400px] mx-auto py-[32px] px-[var(--spacing-container)] flex flex-col lg:flex-row items-center justify-between gap-[16px] lg:gap-0 text-center lg:text-left">
          <div className="flex items-baseline gap-[6px]">
            <span className="font-display text-[1.1rem] text-text-light">Interior</span>
            <span className="font-display text-[0.85rem] italic text-accent-gold">by Her</span>
          </div>
          <p className="text-[0.78rem] text-text-light-muted">© {new Date().getFullYear()} Interior by Her. All rights reserved.</p>
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
