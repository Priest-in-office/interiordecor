import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import './Testimonials.css';

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
    <section ref={sectionRef} className="testi" id="testimonials">
      <div className="testi__container">
        <div className="testi__stats">
          {stats.map((s, i) => (
            <div key={i} className="testi__stat">
              <span className="testi__stat-value" data-value={s.value}>0</span>
              <span className="testi__stat-suffix">{s.suffix}</span>
              <span className="testi__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="testi__header">
          <span className="testi__tag">Client Stories</span>
          <h2 className="testi__heading">Words That <em>Inspire</em> Us</h2>
        </div>
        <div className="testi__grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testi__card">
              <Quote size={32} className="testi__quote-icon" />
              <p className="testi__quote">{t.quote}</p>
              <div className="testi__author">
                <span className="testi__name">{t.name}</span>
                <span className="testi__role">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
