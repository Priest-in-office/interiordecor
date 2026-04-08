import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Sofa, Ruler, Home, Sparkles } from 'lucide-react';
import './Services.css';

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
    <section ref={sectionRef} className="services" id="services">
      <div className="services__inner">
        <div ref={imageRef} className="services__image-col">
          <div className="services__image-wrap">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80" alt="Beautiful designed room" loading="lazy" />
          </div>
        </div>
        <div className="services__content-col">
          <span className="services__label">What We Offer</span>
          <h2 className="services__heading">Services Designed <em>for You</em></h2>
          <div className="services__list">
            {services.map((s, i) => (
              <div key={i} className="services__card">
                <div className="services__icon">{s.icon}</div>
                <div>
                  <h3 className="services__card-title">{s.title}</h3>
                  <p className="services__card-desc">{s.desc}</p>
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
