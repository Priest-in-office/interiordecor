import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Sofa, Ruler, Home, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: <Ruler size={28} />, title: 'Space Planning', desc: 'Thoughtful layouts that maximize flow, function, and natural light in every room.' },
  { icon: <Home size={28} />, title: 'Full Redesign', desc: 'Complete transformation from concept to completion — walls, floors, furnishings, and finishing touches.' },
  { icon: <Palette size={28} />, title: 'Color Consultation', desc: 'Curated palettes that evoke the right mood and complement your architecture.' },
  { icon: <Sofa size={28} />, title: 'Furniture Curation', desc: 'Hand-selected pieces from global artisans and luxury brands, styled to perfection.' },
  { icon: <Sparkles size={28} />, title: 'Staging & Styling', desc: 'Editorial-grade styling for photoshoots, open houses, or everyday living.' },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the image while services scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 10%',
        end: 'bottom bottom',
        pin: imageRef.current,
        pinSpacing: false,
      });

      gsap.utils.toArray<HTMLElement>('.services__card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
            delay: i * 0.05,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[var(--spacing-section)] overflow-x-hidden" id="services">
      <div className="w-full max-w-[1400px] mx-auto px-[var(--spacing-container)] grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[80px] items-start">
        <div ref={imageRef} className="relative">
          <div className="rounded-[24px] overflow-hidden aspect-[16/10] lg:aspect-[3/4]">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80" alt="Beautiful designed room" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="pt-[40px]">
          <span className="text-[0.72rem] font-medium tracking-[0.2em] uppercase text-accent-gold block mb-[16px]">What We Offer</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-text-primary mb-[48px]">Services Designed <em className="italic text-accent-gold">for You</em></h2>
          <div className="flex flex-col gap-[32px]">
            {services.map((s, i) => (
              <div key={i} className="services__card flex gap-[20px] p-[28px] rounded-[16px] bg-bg-cream transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                <div className="shrink-0 w-[52px] h-[52px] rounded-full bg-accent-gold-light text-accent-gold flex items-center justify-center">{s.icon}</div>
                <div>
                  <h3 className="font-display text-[1.3rem] font-medium mb-[6px]">{s.title}</h3>
                  <p className="text-[0.88rem] text-text-secondary leading-[1.6]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
