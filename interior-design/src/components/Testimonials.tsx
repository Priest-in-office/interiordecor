import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: "She didn\'t just redesign our home — she understood how we wanted to feel in it. Every corner tells our story now.", name: 'Adaeze Okonkwo', role: 'Homeowner, Lagos' },
  { quote: "The attention to detail was extraordinary. From the texture of the fabrics to the placement of every light fixture — pure artistry.", name: 'James & Sarah Chen', role: 'Penthouse Clients, London' },
  { quote: "Working with Interior by Her turned our boutique hotel vision into something beyond our imagination. Guests constantly ask who designed it.", name: 'Fatima Al-Rashid', role: 'Hotelier, Dubai' },
];

const stats = [
  { value: 120, suffix: '+', label: 'Projects Completed' },
  { value: 8, suffix: '', label: 'Years of Excellence' },
  { value: 15, suffix: '+', label: 'Design Awards' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats counters
      gsap.utils.toArray<HTMLElement>('.testi__stat-value').forEach(el => {
        const target = parseInt(el.getAttribute('data-value') || '0');
        gsap.fromTo(el, { innerText: '0' }, {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // Animate testimonial cards
      gsap.utils.toArray<HTMLElement>('.testi__card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
            delay: i * 0.12,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[var(--spacing-section)] bg-bg-cream" id="testimonials">
      <div className="w-full max-w-[1400px] mx-auto px-[var(--spacing-container)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[32px] lg:gap-[40px] mb-[80px] text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div>
                <span className="testi__stat-value font-display text-[clamp(2.5rem,5vw,4rem)] font-light text-text-primary leading-none" data-value={s.value}>0</span>
                <span className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-light text-accent-gold inline ml-[2px]">{s.suffix}</span>
              </div>
              <span className="text-[0.78rem] text-text-secondary tracking-[0.05em] mt-[8px]">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="text-center mb-[60px]">
          <span className="text-[0.72rem] font-medium tracking-[0.2em] uppercase text-accent-gold block mb-[12px]">Client Stories</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-text-primary">Words That <em className="italic text-accent-gold">Inspire</em> Us</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
          {testimonials.map((t, i) => (
            <div key={i} className="testi__card bg-bg-primary p-[32px] lg:p-[40px_32px] rounded-[24px] flex flex-col gap-[20px] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
              <Quote size={32} className="text-accent-gold opacity-40 shrink-0" />
              <p className="font-display text-[1.15rem] font-normal leading-[1.6] text-text-primary italic grow">{t.quote}</p>
              <div className="border-t border-[rgba(0,0,0,0.06)] pt-[16px]">
                <span className="font-body text-[0.85rem] font-medium block text-text-primary">{t.name}</span>
                <span className="text-[0.78rem] text-text-secondary">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
