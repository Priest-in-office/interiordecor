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
import './Contact.css';

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

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div className="contact__container">
        <div className="contact__left">
          <span className="contact__label contact__reveal">Get in Touch</span>
          <h2 className="contact__heading contact__reveal">Let's Create <em>Together</em></h2>
          <p className="contact__desc contact__reveal">
            Every great space begins with a conversation. Tell us about your vision, and we'll bring it to life.
          </p>
          <div className="contact__info contact__reveal">
            <a href="mailto:hello@interiorbyher.com" className="contact__info-row">
              <Mail size={18} /> hello@interiorbyher.com
            </a>
            <div className="contact__info-row">
              <MapPin size={18} /> Lagos · London · Dubai
            </div>
          </div>
          <div className="contact__socials contact__reveal">
            <a href="#" className="contact__social" data-cursor="Follow" aria-label="Instagram"><InstagramIcon size={20} /></a>
            <a href="#" className="contact__social" aria-label="Pinterest">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/></svg>
            </a>
          </div>
        </div>
        <form className="contact__form contact__reveal" onSubmit={handleSubmit}>
          <div className="contact__field">
            <label htmlFor="contact-name">Your Name</label>
            <input id="contact-name" type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required placeholder="Full name" />
          </div>
          <div className="contact__field">
            <label htmlFor="contact-email">Email Address</label>
            <input id="contact-email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="you@example.com" />
          </div>
          <div className="contact__field">
            <label htmlFor="contact-project">Tell Us About Your Project</label>
            <textarea id="contact-project" rows={4} value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} placeholder="Describe your dream space..." />
          </div>
          <div className="contact__field">
            <label htmlFor="contact-budget">Estimated Budget</label>
            <select id="contact-budget" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
              <option value="">Select a range</option>
              <option value="10k-25k">$10,000 – $25,000</option>
              <option value="25k-50k">$25,000 – $50,000</option>
              <option value="50k-100k">$50,000 – $100,000</option>
              <option value="100k+">$100,000+</option>
            </select>
          </div>
          <MagneticButton type="submit" className="contact__submit">
            Send Inquiry <ArrowUpRight size={16} />
          </MagneticButton>
        </form>
      </div>
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__logo">
            <span className="footer__logo-main">Interior</span>
            <span className="footer__logo-accent">by Her</span>
          </div>
          <p className="footer__copy">© {new Date().getFullYear()} Interior by Her. All rights reserved.</p>
          <div className="footer__links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
